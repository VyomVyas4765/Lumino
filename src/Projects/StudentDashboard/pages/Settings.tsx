import { useEffect, useMemo, useState } from 'react';
import { Bell, HelpCircle, LogOut, Moon, Palette, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Switch } from '@/Projects/StudentDashboard/components/ui/switch';
import { Button } from '@/Projects/StudentDashboard/components/ui/button';
import { Input } from '@/Projects/StudentDashboard/components/ui/input';
import { Label } from '@/Projects/StudentDashboard/components/ui/label';
import { useLearning } from '@/Projects/StudentDashboard/contexts/LearningContext';
import { useToast } from '@/hooks/use-toast';
import {
  clearSessionUser,
  getSessionUser,
  updateUserPassword,
  updateUserProfile,
} from '@/lib/auth';

type SettingsState = {
  notifications: {
    dailyReminders: boolean;
    achievementAlerts: boolean;
    newLessons: boolean;
    weeklySummary: boolean;
  };
  appearance: {
    darkMode: boolean;
    reduceAnimations: boolean;
  };
  privacy: {
    profileVisibility: boolean;
    learningAnalytics: boolean;
  };
};

const defaultSettings: SettingsState = {
  notifications: {
    dailyReminders: true,
    achievementAlerts: true,
    newLessons: false,
    weeklySummary: true,
  },
  appearance: {
    darkMode: false,
    reduceAnimations: false,
  },
  privacy: {
    profileVisibility: true,
    learningAnalytics: true,
  },
};

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProgress, setWeeklyGoal } = useLearning();

  const sessionUser = getSessionUser();
  const storageKey = useMemo(
    () => `lumio_settings_v1_${sessionUser?.id || 'guest'}`,
    [sessionUser?.id]
  );

  const [displayName, setDisplayName] = useState(sessionUser?.name || '');
  const [email, setEmail] = useState(sessionUser?.email || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  useEffect(() => {
    if (!sessionUser) return;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as SettingsState;
      setSettings({
        notifications: { ...defaultSettings.notifications, ...(parsed.notifications || {}) },
        appearance: { ...defaultSettings.appearance, ...(parsed.appearance || {}) },
        privacy: { ...defaultSettings.privacy, ...(parsed.privacy || {}) },
      });
    } catch {
      setSettings(defaultSettings);
    }
  }, [sessionUser, storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings, storageKey]);

  const updateSettings = <T extends keyof SettingsState>(
    section: T,
    key: keyof SettingsState[T],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const saveProfile = () => {
    if (!sessionUser) {
      toast({
        title: 'Not logged in',
        description: 'Please log in again.',
        variant: 'destructive',
      });
      return;
    }

    if (!displayName.trim() || !email.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Display name and email are required.',
        variant: 'destructive',
      });
      return;
    }

    const result = updateUserProfile({
      userId: sessionUser.id,
      name: displayName,
      email,
    });

    if (!result.ok) {
      toast({
        title: 'Profile update failed',
        description: result.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Profile updated',
      description: 'Your profile details were saved.',
    });
  };

  const handlePasswordChange = () => {
    if (!sessionUser) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Missing fields',
        description: 'Please complete all password fields.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: 'Please ensure new and confirm password match.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Weak password',
        description: 'Use at least 6 characters for the new password.',
        variant: 'destructive',
      });
      return;
    }

    const result = updateUserPassword({
      userId: sessionUser.id,
      currentPassword,
      newPassword,
    });

    if (!result.ok) {
      toast({
        title: 'Password change failed',
        description: result.message,
        variant: 'destructive',
      });
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast({
      title: 'Password updated',
      description: 'Your password has been changed.',
    });
  };

  const handleLogout = () => {
    clearSessionUser();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/', { replace: true });
  };

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your Lumio experience.</p>
      </header>

      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">Profile</h2>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <Button onClick={saveProfile}>Save Profile</Button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: 'dailyReminders', label: 'Daily Reminders', description: 'Get notified to maintain your streak' },
              { key: 'achievementAlerts', label: 'Achievement Alerts', description: 'Celebrate when you unlock achievements' },
              { key: 'newLessons', label: 'New Lessons', description: 'Be notified when new content is available' },
              { key: 'weeklySummary', label: 'Weekly Summary', description: 'Receive a weekly progress report' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={settings.notifications[item.key as keyof SettingsState['notifications']]}
                  onCheckedChange={(checked) =>
                    updateSettings('notifications', item.key as keyof SettingsState['notifications'], checked as boolean)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Save preference for future theme support</p>
              </div>
              <Switch
                checked={settings.appearance.darkMode}
                onCheckedChange={(checked) => updateSettings('appearance', 'darkMode', checked as boolean)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Reduce Animations</p>
                <p className="text-xs text-muted-foreground">Use fewer motion effects</p>
              </div>
              <Switch
                checked={settings.appearance.reduceAnimations}
                onCheckedChange={(checked) => updateSettings('appearance', 'reduceAnimations', checked as boolean)}
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">Learning Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Daily Learning Goal</Label>
              <div className="flex gap-2">
                {[1, 3, 5, 7].map((num) => (
                  <Button
                    key={num}
                    variant={num === userProgress.weeklyGoal ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWeeklyGoal(num)}
                    className={num === userProgress.weeklyGoal ? 'bg-gradient-primary' : ''}
                  >
                    {num} lessons
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">Privacy & Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Profile Visibility</p>
                <p className="text-xs text-muted-foreground">Allow others to see your achievements</p>
              </div>
              <Switch
                checked={settings.privacy.profileVisibility}
                onCheckedChange={(checked) => updateSettings('privacy', 'profileVisibility', checked as boolean)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Learning Analytics</p>
                <p className="text-xs text-muted-foreground">Share anonymous usage analytics</p>
              </div>
              <Switch
                checked={settings.privacy.learningAnalytics}
                onCheckedChange={(checked) => updateSettings('privacy', 'learningAnalytics', checked as boolean)}
              />
            </div>

            <div className="grid gap-2 pt-2">
              <Label>Current Password</Label>
              <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <Label>New Password</Label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <Label>Confirm New Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button variant="outline" onClick={handlePasswordChange}>Change Password</Button>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">Help & Support</h2>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://support.google.com/youtube', '_blank')}>
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('mailto:support@lumio.app')}>
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://forms.gle', '_blank')}>
              Send Feedback
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://example.com/terms', '_blank')}>
              Terms of Service
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pb-4">
        <Button variant="destructive" className="w-full max-w-sm gap-2" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
        <p className="text-sm text-muted-foreground">Lumio Learning Platform v1.0.0</p>
      </div>
    </div>
  );
}
