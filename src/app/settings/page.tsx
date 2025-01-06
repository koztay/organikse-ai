"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  Globe, 
  Lock,
  Moon,
  Settings as SettingsIcon,
  Sun
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
  })

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Notifications
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Receive notifications about updates
              </p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, notifications: checked }))
              }
            />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  Dark Mode
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Toggle dark mode
              </p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => 
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>

          {/* Security */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4" />
              <h3 className="text-sm font-medium">Security</h3>
            </div>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 