import { PageLayout } from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { settings, updateSettings } = useAppStore();
  const { toast } = useToast();

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value });
    toast({
      title: '✅ تم الحفظ',
      description: 'تم تحديث الإعدادات',
    });
  };

  return (
    <PageLayout title="الإعدادات" emoji="⚙️">
      <div className="space-y-4">
        {/* Notifications Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Switch
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => handleSettingChange('notificationsEnabled', checked)}
              />
              <div className="text-right">
                <Label className="font-semibold">حالة الإشعارات</Label>
                <p className="text-sm text-muted-foreground">
                  {settings.notificationsEnabled ? '🟢 مفعّلة' : '🔴 متوقفة'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-right">📨 نوع الإشعار</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={settings.notificationType}
              onValueChange={(value) => handleSettingChange('notificationType', value)}
              className="space-y-2"
            >
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="private">خاص (Private)</Label>
                <RadioGroupItem value="private" id="private" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="group">مجموعة (Group)</Label>
                <RadioGroupItem value="group" id="group" />
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Match Type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-right">🎯 نوع المطابقة</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={settings.matchType}
              onValueChange={(value) => handleSettingChange('matchType', value)}
              className="space-y-2"
            >
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="exact">مطابقة دقيقة (Exact)</Label>
                <RadioGroupItem value="exact" id="exact" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="fuzzy">مطابقة ضبابية (Fuzzy)</Label>
                <RadioGroupItem value="fuzzy" id="fuzzy" />
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Blacklist Match Type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-right">🚫 مطابقة القائمة السوداء</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={settings.blacklistMatchType}
              onValueChange={(value) => handleSettingChange('blacklistMatchType', value)}
              className="space-y-2"
            >
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="bl-exact">مطابقة دقيقة (Exact)</Label>
                <RadioGroupItem value="exact" id="bl-exact" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="bl-fuzzy">مطابقة ضبابية (Fuzzy)</Label>
                <RadioGroupItem value="fuzzy" id="bl-fuzzy" />
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Smart Ad Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Switch
                checked={settings.smartAdFilter}
                onCheckedChange={(checked) => handleSettingChange('smartAdFilter', checked)}
              />
              <div className="text-right">
                <Label className="font-semibold">🧠 فلتر الإعلانات الذكي</Label>
                <p className="text-sm text-muted-foreground">
                  تصفية الرسائل الإعلانية تلقائياً
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search History */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Switch
                checked={settings.searchHistory}
                onCheckedChange={(checked) => handleSettingChange('searchHistory', checked)}
              />
              <div className="text-right">
                <Label className="font-semibold">📜 سجل البحث</Label>
                <p className="text-sm text-muted-foreground">
                  حفظ سجل التطابقات
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Push Interval */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-right">⏱️ فترة الإشعارات</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={settings.pushInterval}
              onValueChange={(value) => handleSettingChange('pushInterval', value)}
              className="space-y-2"
            >
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="instant">فوري</Label>
                <RadioGroupItem value="instant" id="instant" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="1min">كل دقيقة</Label>
                <RadioGroupItem value="1min" id="1min" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="5min">كل 5 دقائق</Label>
                <RadioGroupItem value="5min" id="5min" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="1hour">كل ساعة</Label>
                <RadioGroupItem value="1hour" id="1hour" />
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Message Limit */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-right">📏 حد طول الرسالة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider
                value={[settings.messageLimit]}
                onValueChange={(value) => handleSettingChange('messageLimit', value[0])}
                min={50}
                max={500}
                step={10}
                className="w-full"
              />
              <p className="text-center text-sm text-muted-foreground">
                {settings.messageLimit} حرف
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
