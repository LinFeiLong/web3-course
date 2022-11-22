import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import useEth from "../../contexts/EthContext/useEth"
import refresh from "../../utils/refresh"

const steps = [
  {
    label: "Enregistrement des votants",
    description: ``,
  },
  {
    label: "Début des propositions",
    description: "",
  },
  {
    label: "Fin des propositions",
    description: ``,
  },
  {
    label: "Début des votes",
    description: ``,
  },
  {
    label: "Fin des votes",
    description: ``,
  },
  {
    label: "Résultats des votes",
    description: ``,
  },
]

export default function AppStatus({ workflowStatusLabel = 0 }) {
  const [activeStep, setActiveStep] = React.useState(workflowStatusLabel)
  const {
    state: { contract, accounts },
  } = useEth()

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        await startProposalsRegistering()
        break
      case 1:
        await endProposalsRegistering()
        break
      case 2:
        await startVotingSession()
        break
      case 3:
        await endVotingSession()
        break
      case 4:
        await tallyVotes()
        break
      default:
        await console.log(
          "La commande de réinitialisation n'est pas implémenté"
        )
        break
    }
    await setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  useEffect(() => {
    setActiveStep(workflowStatusLabel)
  }, [workflowStatusLabel])

  // ::::::::::::: STATE ::::::::::::: //

  const startProposalsRegistering = async (e) => {
    try {
      await contract?.methods
        ?.startProposalsRegistering()
        .send({ from: accounts[0] })
      await refresh()
    } catch (e) {
      console.log(e)
    }
  }

  const endProposalsRegistering = async (e) => {
    try {
      await contract?.methods
        ?.endProposalsRegistering()
        .send({ from: accounts[0] })
      await refresh()
    } catch (e) {
      console.log(e)
    }
  }

  const startVotingSession = async (e) => {
    try {
      await contract?.methods?.startVotingSession().send({ from: accounts[0] })
      await refresh()
    } catch (e) {
      console.log(e)
    }
  }

  const endVotingSession = async (e) => {
    try {
      await contract?.methods?.endVotingSession().send({ from: accounts[0] })
      await refresh()
    } catch (e) {
      console.log(e)
    }
  }

  const tallyVotes = async (e) => {
    try {
      await contract?.methods?.tallyVotes().send({ from: accounts[0] })
      await refresh()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Résultats" : "Continuer"}
                    </Button>
                  }
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}
