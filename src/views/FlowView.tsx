import React, { useCallback, useState } from "react"
import { PageTitle } from "../components/Common/PageTitle"
import WorkspaceSelection from "../components/FlowChart/WorkspaceSelection"
import {
  duplicateFlow,
  startFlow,
  stopFlow,
} from "../redux/flows/flows.actions"
import CommandBar from "../components/FlowChart/CommandBar"

import Sidebar from "../components/FlowChart/Sidebar"
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFlowArguments,
  selectSelectedFlow,
  selectSelectedFlowId,
} from "../redux/flows/flows.selectors"
import { showModal } from "../redux/global/global.actions"
import logger from "../logger"
import { copyToClipboard, formatAsYAML } from "../helpers"
import html2canvas from "html2canvas"
import FlowChart from "../components/FlowChart/FlowChart"
import FlowSelection from "../components/FlowChart/FlowSelection"

const FlowViewContainer = styled.div`
  display: flex;
  min-height: 58rem;
`

export default function FlowView() {
  const dispatch = useDispatch()
  const selectedFlowId = useSelector(selectSelectedFlowId)
  const flowArguments = useSelector(selectFlowArguments)
  const flow = useSelector(selectSelectedFlow)
  let flowChart = flow?.flowChart
  let flowType = flow?.type

  const copyChartAsYAML = useCallback(() => {
    logger.log("copyChartAsYAML | chart:", flowChart)
    copyToClipboard(formatAsYAML(flowChart, flowArguments))
    alert("Chart copied to clipboard as YAML")
  }, [flowChart, flowArguments])

  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  //todo fix overlay
  logger.log("showOverlay", showOverlay)
  const showCaptureOverlay = (showOverlay = true) => {
    setShowOverlay(showOverlay)
  }

  const exportImage = (extension = "png") => {
    const chartContainer = document.querySelector(".reactflow-wrapper")
    const captureOverlay = document.querySelector(".capture-overlay")
    if (!chartContainer) return
    if (captureOverlay) captureOverlay.classList.add("fade-out")

    showCaptureOverlay()
    setTimeout(() => showCaptureOverlay(false), 500)

    let canvasParams = {
      foreignObjectRendering: true,
      logging: true,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      scale: 5,
    }

    html2canvas(chartContainer as HTMLElement, canvasParams).then((canvas) => {
      var image = canvas.toDataURL(`image/${extension}`)
      var link = document.getElementById("download-link")
      if (!link) return
      link.setAttribute("download", `jina-flow-visual.${extension}`)
      link.setAttribute("href", image)
      link.click()
    })
  }

  const handleDuplicateFlow = () => {
    const flowYAML = formatAsYAML(flowChart, flowArguments)
    dispatch(duplicateFlow(flowYAML))
  }

  if (!flowChart) return <>No Flow</>

  return (
    <div className="main-content-container px-0">
      <div className="px-4">
        <a href="/#" id="download-link" style={{ display: "none" }}>
          download
        </a>
        <div className="page-header mb-4">
          <PageTitle title="Flow Design" className="text-sm-left mb-3" />
        </div>

        <FlowViewContainer>
          <WorkspaceSelection />
          <div className="chart-section-container mr-md-4 mb-4 relative">
            <FlowSelection />
            <CommandBar
              startFlow={() => dispatch(startFlow(selectedFlowId))}
              stopFlow={() => dispatch(stopFlow(selectedFlowId))}
              copyChart={copyChartAsYAML}
              importChart={() => dispatch(showModal("import"))}
              exportImage={exportImage}
            />
            <FlowChart elements={flowChart.elements} />
          </div>

          <Sidebar
            arguments={flowArguments.pod}
            duplicateFlow={handleDuplicateFlow}
            readonly={flowType !== "user-generated"}
            elements={flowChart.elements}
            deleteSelection={() => {}}
          />
        </FlowViewContainer>
      </div>
    </div>
  )
}
