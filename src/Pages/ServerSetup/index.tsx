import styles from './styles.module.scss'

import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Card from '../../Components/Card'
import Loading from '../../Components/Loading'
import { useTranslation } from 'react-i18next'

const ServerSetup: React.FC = () => {
  // Vars
  const [state, setState] = useState<'loading' | 'loaded'>('loading')
  const [activeStep, setActiveStep] = useState(0)
  // Hooks
  const { t } = useTranslation()

  // Lifecycle
  useEffect(() => {
    setTimeout(() => setState('loaded'), 1000)
  }, [])
  // Functions

  // UI
  return (
    <div className={styles.serverSetup}>
      <Card
        animate
        centered
        style={{
          maxHeight: state === 'loaded' ? 350 : activeStep !== 0 ? 115 : 'auto',
        }}
        title={state === 'loaded' ? t('system.setup.title') : ''}
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
              <div>
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
                  <Typography variant="body1">
                    {t('system.setup.step2.text')}
                  </Typography>
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
                onClick={() =>
                  activeStep < 3
                    ? setActiveStep(activeStep + 1)
                    : setState('loading')
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
