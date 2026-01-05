import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { MenuItem } from '@/components/ui/menu-item';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent } from '@/components/ui/card';

export default function Index() {
  const navigate = useNavigate();
  const { keywords, blacklist, groups, settings } = useAppStore();
  
  const totalMatches = keywords.reduce((sum, k) => sum + k.matchCount, 0);

  return (
    <PageLayout title="مراقب الكلمات المفتاحية" emoji="🤖" showBack={false}>
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-primary">{keywords.length}</p>
            <p className="text-xs text-muted-foreground">كلمات مفتاحية</p>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-success">{totalMatches}</p>
            <p className="text-xs text-muted-foreground">تطابقات</p>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-warning">{groups.length}</p>
            <p className="text-xs text-muted-foreground">مجموعات</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Card */}
      <Card className={`mb-6 ${settings.notificationsEnabled ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{settings.notificationsEnabled ? '🟢' : '🔴'}</span>
            <div>
              <p className="font-semibold">حالة الإشعارات</p>
              <p className="text-sm text-muted-foreground">
                {settings.notificationsEnabled ? 'مفعّلة' : 'متوقفة'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-3">
        <MenuItem
          emoji="🔑"
          title="الكلمات المفتاحية"
          subtitle="إضافة وإدارة الكلمات للمراقبة"
          to="/keywords"
          badge={keywords.length}
        />
        
        <MenuItem
          emoji="🚫"
          title="القائمة السوداء"
          subtitle="كلمات يتم تجاهلها"
          to="/blacklist"
          badge={blacklist.length}
        />
        
        <MenuItem
          emoji="⚙️"
          title="الإعدادات"
          subtitle="إعدادات الإشعارات والمطابقة"
          to="/settings"
        />
        
        <MenuItem
          emoji="👥"
          title="إدارة المجموعات"
          subtitle="قنوات استلام الإشعارات"
          to="/groups"
          badge={groups.length}
        />
        
        <MenuItem
          emoji="📤"
          title="تصدير البيانات"
          subtitle="تصدير الكلمات والسجلات"
          to="/export"
        />
        
        <MenuItem
          emoji="📖"
          title="دليل الاستخدام"
          subtitle="تعليمات وشرح الميزات"
          to="/guide"
        />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>مراقب الكلمات المفتاحية v1.0</p>
        <p className="mt-1">🤖 بوت تيليجرام للمراقبة الذكية</p>
      </div>
    </PageLayout>
  );
}
