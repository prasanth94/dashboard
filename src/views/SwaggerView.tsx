import React, { useState } from "react"
import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  TextField,
} from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import styled from "@emotion/styled"
import SwaggerUIReact from "swagger-ui-react"

import LiveResponse from "../components/DebuggingTool/CustomLiveResponse"
import Response from "../components/DebuggingTool/Response"

const DEFAULT_ENDPOINT = "openapi.json"

const TextInput = styled(TextField)`
  width: 100%;
`
const FullSizeButton = styled(Button)`
  width: 100%;
  height: 100%;
`

const WrappedComponents = function () {
  return {
    wrapComponents: {
      liveResponse: (Original: any, system: any) => (props: any) => {
        return <LiveResponse {...props} />
      },
    },
    components: {
      debugResponse: ({ response }: any) => (
        <>
          <h5>Response body</h5>
          <Response response={response} />
        </>
      ),
    },
  }
}

function getHostAndPortFromLocation() {
  const { location } = window
  const host = location.protocol + "//" + location.hostname
  const port = location.port
  return { host, port }
}

function getInitialHostAndPort() {
  const searchParams = new URLSearchParams(
    window.location.search || window.location.hash.split("?")[1]
  )
  const host = searchParams.get("host")
  const port = searchParams.get("port")
  if (host) return { host, port }
  else return getHostAndPortFromLocation()
}

function formatURL(
  host: string,
  port: string | null | undefined,
  endpoint: string
) {
  if (port) return `${host}:${port}/${endpoint}`
  else return `${host}/${endpoint}`
}

const SwaggerView = () => {
  const [show, setShow] = useState(false)
  const [host, setHost] = useState(getInitialHostAndPort().host)
  const [port, setPort] = useState(getInitialHostAndPort().port)
  const [endpoint, setEndpoint] = useState(DEFAULT_ENDPOINT)
  const [url, setURL] = useState(formatURL(host, port, endpoint))

  const updateURL = () => {
    setURL(formatURL(host, port, endpoint))
  }

  const toggleShow = () => {
    setShow((prev) => !prev)
  }

  return (
    <Container data-name="debuggingTool">
      <Box textAlign="right">
        <Button onClick={toggleShow}>
          endpoint settings {show ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </Box>
      <Collapse in={show}>
        <Box paddingTop="2.5em">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextInput
                label="Host"
                variant="outlined"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextInput
                label="Port"
                variant="outlined"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                label="OpenAPI Schema"
                variant="outlined"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <FullSizeButton onClick={updateURL} variant="contained">
                Set
              </FullSizeButton>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
      <SwaggerUIReact
        url={url}
        presets={[WrappedComponents]}
        requestInterceptor={console.log}
        responseInterceptor={console.log}
      />
    </Container>
  )
}
export default SwaggerView
