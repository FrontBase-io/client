import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import socket from '../../Utils/Socket'

import styles from './styles.module.scss'

import Card from '../../Components/Card'
import Loading from '../../Components/Loading'
import { Button, Grid, TextField } from '@mui/material'

const Login: React.FC = () => {
  // Vars
  const [state, setState] = useState<'loading' | 'loaded'>('loading')
  const [newUser, setNewUser] = useState({ username: '', password: '' })

  // Hooks
  const { t } = useTranslation()

  // Lifecycle
  useEffect(() => {
    setTimeout(() => setState('loaded'), 500)
    socket.on('receive-token', (token) => {
      localStorage.setItem('token', token)
      window.location.reload()
    })
  }, [])

  // Functions

  // UI
  return (
    <div className={styles.login}>
      <Card
        animate
        centered
        style={{
          maxHeight: state === 'loaded' ? 290 : 80,
        }}
        title={state === 'loaded' && t('system.login.title')}
      >
        {state === 'loading' ? (
          <Loading />
        ) : (
          <Grid container spacing={3} style={{ marginTop: 10 }}>
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
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setState('loading')
                  socket.emit('authenticate', {
                    username: newUser.username,
                    password: newUser.password,
                  })
                }}
              >
                {t('system.login.title')}
              </Button>
            </Grid>
          </Grid>
        )}
      </Card>
    </div>
  )
}

export default Login
