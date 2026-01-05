import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Blacklist() {
  const { blacklist, addToBlacklist, removeFromBlacklist } = useAppStore();
  const [newWord, setNewWord] = useState('');
  const { toast } = useToast();

  const handleAddWord = () => {
    if (!newWord.trim()) {
      toast({
        title: '⚠️ خطأ',
        description: 'الرجاء إدخال كلمة',
        variant: 'destructive',
      });
      return;
    }

    if (blacklist.some(b => b.text.toLowerCase() === newWord.trim().toLowerCase())) {
      toast({
        title: '⚠️ تكرار',
        description: 'هذه الكلمة موجودة في القائمة السوداء مسبقاً',
        variant: 'destructive',
      });
      return;
    }

    addToBlacklist(newWord.trim());
    setNewWord('');
    toast({
      title: '✅ تمت الإضافة',
      description: `تمت إضافة "${newWord.trim()}" للقائمة السوداء`,
    });
  };

  const handleRemoveWord = (id: string, text: string) => {
    removeFromBlacklist(id);
    toast({
      title: '🗑️ تم الحذف',
      description: `تم حذف "${text}" من القائمة السوداء`,
    });
  };

  return (
    <PageLayout title="القائمة السوداء" emoji="🚫">
      {/* Info Card */}
      <Card className="mb-6 bg-destructive/5 border-destructive/20">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            الكلمات في القائمة السوداء لن تظهر في نتائج المراقبة حتى لو تطابقت مع الكلمات المفتاحية
          </p>
        </CardContent>
      </Card>

      {/* Add Word Form */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="أدخل كلمة للقائمة السوداء..."
              className="flex-1 text-right"
              onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
            />
            <Button onClick={handleAddWord} size="icon" variant="destructive">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Blacklist */}
      {blacklist.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl mb-4 block">📋</span>
            <p className="text-muted-foreground">القائمة السوداء فارغة</p>
            <p className="text-sm text-muted-foreground mt-2">
              أضف كلمات تريد تجاهلها
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {blacklist.map((word, index) => (
            <Card key={word.id} className="animate-slide-in-right" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveWord(word.id, word.text)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex-1 mx-4 text-right">
                    <p className="font-semibold">{word.text}</p>
                  </div>
                  
                  <span className="text-xl">🚫</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary */}
      <Card className="mt-6 bg-destructive/5 border-destructive/20">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            إجمالي الكلمات المحظورة: <span className="font-bold text-destructive">{blacklist.length}</span>
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
