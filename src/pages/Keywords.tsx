import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 6;

export default function Keywords() {
  const { keywords, addKeyword, removeKeyword, toggleKeyword } = useAppStore();
  const [newKeyword, setNewKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(keywords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedKeywords = keywords.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) {
      toast({
        title: '⚠️ خطأ',
        description: 'الرجاء إدخال كلمة مفتاحية',
        variant: 'destructive',
      });
      return;
    }

    if (keywords.some(k => k.text.toLowerCase() === newKeyword.trim().toLowerCase())) {
      toast({
        title: '⚠️ تكرار',
        description: 'هذه الكلمة موجودة مسبقاً',
        variant: 'destructive',
      });
      return;
    }

    addKeyword(newKeyword.trim());
    setNewKeyword('');
    toast({
      title: '✅ تمت الإضافة',
      description: `تمت إضافة "${newKeyword.trim()}" للمراقبة`,
    });
  };

  const handleRemoveKeyword = (id: string, text: string) => {
    removeKeyword(id);
    toast({
      title: '🗑️ تم الحذف',
      description: `تم حذف "${text}"`,
    });
  };

  return (
    <PageLayout title="الكلمات المفتاحية" emoji="🔑">
      {/* Add Keyword Form */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="أدخل كلمة مفتاحية جديدة..."
              className="flex-1 text-right"
              onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
            />
            <Button onClick={handleAddKeyword} size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keywords List */}
      {keywords.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-muted-foreground">لا توجد كلمات مفتاحية</p>
            <p className="text-sm text-muted-foreground mt-2">
              أضف كلمات للبدء في المراقبة
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {displayedKeywords.map((keyword, index) => (
              <Card key={keyword.id} className="animate-slide-in-right" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveKeyword(keyword.id, keyword.text)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex-1 mx-4 text-right">
                      <p className="font-semibold">{keyword.text}</p>
                      <p className="text-sm text-muted-foreground">
                        التطابقات: {keyword.matchCount}
                      </p>
                    </div>
                    
                    <Switch
                      checked={keyword.enabled}
                      onCheckedChange={() => toggleKeyword(keyword.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {currentPage} / {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Summary */}
      <Card className="mt-6 bg-primary/5 border-primary/20">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            إجمالي الكلمات: <span className="font-bold text-primary">{keywords.length}</span>
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
