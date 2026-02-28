import { useState, useEffect } from 'react'
import { PublicClientApplication } from '@azure/msal-browser'
import { ConfigProvider, Layout, theme, Typography, Button } from 'antd'
import 'antd/dist/reset.css'
import './App.css'

const { Header, Content, Footer } = Layout
const { Title, Paragraph } = Typography

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI,
  },
}

const msalInstance = new PublicClientApplication(msalConfig)

function App() {
  const [user, setUser] = useState(null)
  const [licenses, setLicenses] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize MSAL
    msalInstance.initialize()

    // Check for existing session
    const accounts = msalInstance.getAllAccounts()
    if (accounts.length > 0) {
      setUser(accounts[0])
    }
  }, [])

  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup()
      setUser(loginResponse.account)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await msalInstance.logoutPopup()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchLicenses = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch('/api/licenses', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      const data = await response.json()
      setLicenses(data)
    } catch (error) {
      console.error('Error fetching licenses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0078d4',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={3} style={{ margin: 0, color: 'white' }}>
            CSP Storefront
          </Title>
          <div>
            {user ? (
              <Button type="default" onClick={handleLogout}>
                Sign Out
              </Button>
            ) : (
              <Button type="primary" onClick={handleLogin}>
                Sign In with Entra ID
              </Button>
            )}
          </div>
        </Header>

        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {!user ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <Title level={1}>Welcome to CSP Storefront</Title>
              <Paragraph>Sign in with your Entra ID to manage your licenses</Paragraph>
            </div>
          ) : (
            <div>
              <Title level={2}>Your Licenses</Title>
              <Paragraph>
                Current allocation: <strong>{licenses?.total || 0} licenses</strong>
              </Paragraph>

              <div style={{ marginTop: '24px' }}>
                <Button
                  type="primary"
                  onClick={fetchLicenses}
                  loading={loading}
                  disabled={!licenses}
                >
                  Refresh License Information
                </Button>
              </div>

              {licenses && (
                <div style={{ marginTop: '24px' }}>
                  <Title level={3}>License Types</Title>
                  {Object.entries(licenses.types || {}).map(([type, count]) => (
                    <div key={type} style={{ marginBottom: '12px' }}>
                      <Paragraph>
                        {type}: <strong>{count}</strong>
                      </Paragraph>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          CSP Storefront ©{new Date().getFullYear()} Created by openclaw-haussler
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App