import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Groups() {
  const { groups, addGroup, removeGroup, toggleGroup } = useAppStore();
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupChatId, setNewGroupChatId] = useState('');
  const { toast } = useToast();

  const handleAddGroup = () => {
    if (!newGroupName.trim() || !newGroupChatId.trim()) {
      toast({
        title: '⚠️ خطأ',
        description: 'الرجاء إدخال اسم المجموعة ومعرف الدردشة',
        variant: 'destructive',
      });
      return;
    }

    addGroup(newGroupName.trim(), newGroupChatId.trim());
    setNewGroupName('');
    setNewGroupChatId('');
    toast({
      title: '✅ تمت الإضافة',
      description: `تمت إضافة مجموعة "${newGroupName.trim()}"`,
    });
  };

  const handleRemoveGroup = (id: string, name: string) => {
    removeGroup(id);
    toast({
      title: '🗑️ تم الحذف',
      description: `تم حذف مجموعة "${name}"`,
    });
  };

  return (
    <PageLayout title="إدارة المجموعات" emoji="👥">
      {/* Info Card */}
      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            أضف المجموعات التي تريد استلام الإشعارات فيها. يمكنك الحصول على معرف الدردشة من البوت.
          </p>
        </CardContent>
      </Card>

      {/* Add Group Form */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <Input
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="اسم المجموعة..."
            className="text-right"
          />
          <Input
            value={newGroupChatId}
            onChange={(e) => setNewGroupChatId(e.target.value)}
            placeholder="معرف الدردشة (Chat ID)..."
            className="text-right"
          />
          <Button onClick={handleAddGroup} className="w-full">
            <Plus className="h-5 w-5 ml-2" />
            إضافة مجموعة
          </Button>
        </CardContent>
      </Card>

      {/* Groups List */}
      {groups.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl mb-4 block">📭</span>
            <p className="text-muted-foreground">لا توجد مجموعات مسجلة</p>
            <p className="text-sm text-muted-foreground mt-2">
              أضف مجموعات لاستلام الإشعارات
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {groups.map((group, index) => (
            <Card key={group.id} className="animate-slide-in-right" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveGroup(group.id, group.name)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex-1 mx-4 text-right">
                    <p className="font-semibold">{group.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {group.chatId}
                    </p>
                  </div>
                  
                  <Switch
                    checked={group.enabled}
                    onCheckedChange={() => toggleGroup(group.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary */}
      <Card className="mt-6 bg-primary/5 border-primary/20">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            إجمالي المجموعات: <span className="font-bold text-primary">{groups.length}</span>
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
