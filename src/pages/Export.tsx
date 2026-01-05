import { PageLayout } from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Export() {
  const { keywords, blacklist, groups, settings } = useAppStore();
  const { toast } = useToast();

  const exportKeywords = () => {
    const data = keywords.map(k => ({
      text: k.text,
      enabled: k.enabled,
      matchCount: k.matchCount,
    }));
    
    downloadJSON(data, 'keywords.json');
    toast({
      title: '📥 تم التصدير',
      description: 'تم تصدير الكلمات المفتاحية',
    });
  };

  const exportBlacklist = () => {
    const data = blacklist.map(b => b.text);
    
    downloadJSON(data, 'blacklist.json');
    toast({
      title: '📥 تم التصدير',
      description: 'تم تصدير القائمة السوداء',
    });
  };

  const exportSettings = () => {
    downloadJSON(settings, 'settings.json');
    toast({
      title: '📥 تم التصدير',
      description: 'تم تصدير الإعدادات',
    });
  };

  const exportAll = () => {
    const data = {
      keywords: keywords.map(k => ({
        text: k.text,
        enabled: k.enabled,
        matchCount: k.matchCount,
      })),
      blacklist: blacklist.map(b => b.text),
      groups: groups.map(g => ({
        name: g.name,
        chatId: g.chatId,
        enabled: g.enabled,
      })),
      settings,
    };
    
    downloadJSON(data, 'keyword-monitor-backup.json');
    toast({
      title: '📥 تم التصدير',
      description: 'تم تصدير جميع البيانات',
    });
  };

  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PageLayout title="تصدير البيانات" emoji="📤">
      <div className="space-y-4">
        {/* Export Keywords */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button onClick={exportKeywords} variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-semibold">🔑 الكلمات المفتاحية</p>
                  <p className="text-sm text-muted-foreground">{keywords.length} كلمة</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Blacklist */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button onClick={exportBlacklist} variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-semibold">🚫 القائمة السوداء</p>
                  <p className="text-sm text-muted-foreground">{blacklist.length} كلمة</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button onClick={exportSettings} variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-semibold">⚙️ الإعدادات</p>
                  <p className="text-sm text-muted-foreground">جميع الإعدادات</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export All */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button onClick={exportAll}>
                <Database className="h-4 w-4 ml-2" />
                تصدير الكل
              </Button>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-semibold">💾 نسخة احتياطية كاملة</p>
                  <p className="text-sm text-muted-foreground">
                    جميع البيانات والإعدادات
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  يتم تصدير البيانات بصيغة JSON. يمكنك استخدام هذه الملفات لاستعادة البيانات لاحقاً أو نقلها لجهاز آخر.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
