"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Moon, Sun, Shield } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: {
      email_updates: false,
      marketing_emails: false
    },
    privacy: {
      profile_visible: true
    }
  })

  // Load user settings
  useEffect(() => {
    async function loadSettings() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }
      // Load user settings from metadata
      setSettings(user.user_metadata.settings || settings)
    }
    loadSettings()
  }, [])

  const updateSettings = async (newSettings: typeof settings) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { settings: newSettings }
      })

      if (error) throw error

      setSettings(newSettings)
      toast({
        title: "Settings updated",
        description: "Your settings have been saved successfully."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings. Please try again."
      })
    }
  }

  return (
    <div className="container max-w-2xl py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="p-4 bg-card rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
                <h2 className="font-medium">Appearance</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Customize how the app looks
              </p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-4 bg-card rounded-lg border">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <h2 className="font-medium">Notifications</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm">Email Updates</p>
                <p className="text-xs text-muted-foreground">
                  Receive email notifications about your account
                </p>
              </div>
              <Switch
                checked={settings.notifications.email_updates}
                onCheckedChange={(checked) => 
                  updateSettings({
                    ...settings,
                    notifications: { ...settings.notifications, email_updates: checked }
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm">Marketing Emails</p>
                <p className="text-xs text-muted-foreground">
                  Receive emails about new features and updates
                </p>
              </div>
              <Switch
                checked={settings.notifications.marketing_emails}
                onCheckedChange={(checked) => 
                  updateSettings({
                    ...settings,
                    notifications: { ...settings.notifications, marketing_emails: checked }
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="p-4 bg-card rounded-lg border">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <h2 className="font-medium">Privacy</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm">Profile Visibility</p>
                <p className="text-xs text-muted-foreground">
                  Make your profile visible to other users
                </p>
              </div>
              <Switch
                checked={settings.privacy.profile_visible}
                onCheckedChange={(checked) => 
                  updateSettings({
                    ...settings,
                    privacy: { ...settings.privacy, profile_visible: checked }
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 