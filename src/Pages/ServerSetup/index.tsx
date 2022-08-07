import styles from './styles.module.scss'

import {
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Card from '../../Components/Card'
import Loading from '../../Components/Loading'
import { useTranslation } from 'react-i18next'
import socket from '../../Utils/Socket'

const ServerSetup: React.FC = () => {
  // Vars
  const [state, setState] = useState<'loading' | 'loaded'>('loading')
  const [activeStep, setActiveStep] = useState(0)
  const [newUser, setNewUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    email: '',
  })

  // Hooks
  const { t } = useTranslation()

  // Lifecycle
  useEffect(() => {
    setTimeout(() => setState('loaded'), 1000)
    socket.on('user-created', () => {
      window.location.reload()
    })
  }, [])

  // Functions

  // UI
  return (
    <div className={styles.serverSetup}>
      <Card
        animate
        centered
        style={{
          maxHeight:
            state === 'loaded'
              ? activeStep === 1
                ? 500
                : 350
              : activeStep !== 0
              ? 125
              : 'auto',
        }}
        title={
          state === 'loaded'
            ? newUser.first_name
              ? t('system.setup.title_personalised', {
                  name: newUser.first_name,
                })
              : t('system.setup.title')
            : ''
        }
      >
        <>
          {state === 'loading' ? (
            <>
              <Loading style={{ height: 75 }} />
              {activeStep !== 0 && (
                <div style={{ textAlign: 'center' }}>
                  {t('system.setup.installing')}
                </div>
              )}
            </>
          ) : (
            <div className={styles.content}>
              <div className={styles.flex}>
                <Stepper activeStep={activeStep}>
                  <Step
                    completed={activeStep > 0}
                    onClick={() => activeStep > 0 && setActiveStep(0)}
                    style={{ cursor: activeStep > 0 ? 'pointer' : 'default' }}
                  >
                    <StepLabel>{t('system.setup.step1.title')}</StepLabel>
                  </Step>
                  <Step
                    completed={activeStep > 1}
                    onClick={() => activeStep > 1 && setActiveStep(1)}
                    style={{ cursor: activeStep > 1 ? 'pointer' : 'default' }}
                  >
                    <StepLabel>{t('system.setup.step2.title')}</StepLabel>
                  </Step>
                  <Step
                    completed={activeStep > 2}
                    onClick={() => activeStep > 2 && setActiveStep(2)}
                    style={{ cursor: activeStep > 2 ? 'pointer' : 'default' }}
                  >
                    <StepLabel>{t('system.setup.step3.title')}</StepLabel>
                  </Step>
                  <Step
                    completed={activeStep > 3}
                    onClick={() => activeStep > 3 && setActiveStep(3)}
                    style={{ cursor: activeStep > 3 ? 'pointer' : 'default' }}
                  >
                    <StepLabel>{t('system.setup.step4.title')}</StepLabel>
                  </Step>
                </Stepper>
                {activeStep === 0 ? (
                  <Typography variant="body1">
                    {t('system.setup.step1.text')}
                  </Typography>
                ) : activeStep === 1 ? (
                  // Administrator
                  <>
                    <Typography variant="body1">
                      {t('system.setup.step2.text')}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label={t('system.user.first_name')}
                          id="first_name"
                          type="text"
                          value={newUser.first_name}
                          onChange={(e) =>
                            setNewUser({
                              ...newUser,
                              first_name: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label={t('system.user.last_name')}
                          id="last_name"
                          type="text"
                          value={newUser.last_name}
                          onChange={(e) =>
                            setNewUser({
                              ...newUser,
                              last_name: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('system.user.username')}
                          id="username"
                          type="text"
                          value={newUser.username}
                          onChange={(e) =>
                            setNewUser({ ...newUser, username: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('system.user.password')}
                          id="password"
                          type="password"
                          value={newUser.password}
                          onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('system.user.email')}
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                          }
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : activeStep === 2 ? (
                  <Typography variant="body1">
                    {t('system.setup.step3.text')}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    {t('system.setup.step4.text')}
                  </Typography>
                )}
              </div>
              <Button
                fullWidth
                variant="contained"
                onClick={
                  activeStep < 3
                    ? () => setActiveStep(activeStep + 1)
                    : () => {
                        setState('loading')
                        socket.emit('setup-server', { user: newUser })
                      }
                }
              >
                {activeStep === 3
                  ? t('system.setup.buttons.install')
                  : t('system.setup.buttons.next')}
              </Button>
            </div>
          )}
        </>
      </Card>
    </div>
  )
}

export default ServerSetup
