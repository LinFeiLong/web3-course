import React, { useState, useEffect } from "react"
import Demo from "../Demo"
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar"
import AppStatus from "../AppStatus/AppStatus"
import Grid from "@mui/material/Unstable_Grid2"
import useEth from "../../contexts/EthContext/useEth"

export default function MainContainer() {
  const { state } = useEth()
  const { contract, accounts } = state
  const [ownerAddress, setOwnerAddress] = useState(null)
  const isOwner = ownerAddress === accounts?.[0]
  const [workflowStatusLabel, setWorkflowStatusLabel] = useState("")

  /**
   * Automatically save the contract's owner address
   */
  useEffect(() => {
    ;(async function () {
      const address = await contract?.methods?.owner().call()
      setOwnerAddress(address)
    })()
  }, [contract, state])

  /**
   * Automatically save the workflow status
   */
  useEffect(() => {
    ;(async function () {
      const workflowStatus = await contract?.methods?.workflowStatus().call()
      setWorkflowStatusLabel(parseInt(workflowStatus))
    })()
  }, [contract, state])

  return (
    <>
      <ResponsiveAppBar isOwner={isOwner} account={accounts?.[0]} />
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Demo isOwner={isOwner} workflowStatusLabel={workflowStatusLabel} />
        </Grid>
        <Grid xs={4}>
          {isOwner ? (
            <AppStatus workflowStatusLabel={workflowStatusLabel} />
          ) : null}
        </Grid>
      </Grid>
    </>
  )
}
