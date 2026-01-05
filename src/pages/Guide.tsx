import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Guide() {
  return (
    <PageLayout title="دليل الاستخدام" emoji="📖">
      <div className="space-y-4">
        {/* Welcome */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <span className="text-4xl mb-2 block">🤖</span>
            <h2 className="font-bold text-lg">مرحباً بك في مراقب الكلمات المفتاحية</h2>
            <p className="text-sm text-muted-foreground mt-2">
              بوت ذكي لمراقبة المحادثات والتنبيه عند ذكر كلمات معينة
            </p>
          </CardContent>
        </Card>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="keywords" className="border rounded-lg px-4">
            <AccordionTrigger className="text-right">
              🔑 كيف أضيف كلمات مفتاحية؟
            </AccordionTrigger>
            <AccordionContent className="text-right text-muted-foreground">
              <ol className="list-decimal list-inside space-y-2 pr-4">
                <li>اذهب لصفحة "الكلمات المفتاحية"</li>
                <li>اكتب الكلمة في حقل الإدخال</li>
                <li>اضغط على زر الإضافة (+)</li>
                <li>يمكنك تفعيل/تعطيل كل كلمة بشكل منفصل</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="blacklist" className="border rounded-lg px-4">
            <AccordionTrigger className="text-right">
              🚫 ما هي القائمة السوداء؟
            </AccordionTrigger>
            <AccordionContent className="text-right text-muted-foreground">
              <p className="mb-2">
                القائمة السوداء تحتوي على كلمات تريد تجاهلها. حتى لو تطابقت رسالة مع كلمة مفتاحية، لن يتم إرسال تنبيه إذا احتوت على كلمة من القائمة السوداء.
              </p>
              <p>
                مثال: إذا كانت "سيارة" كلمة مفتاحية و"للبيع" في القائمة السوداء، لن تصلك إشعارات عن "سيارة للبيع".
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="match-types" className="border rounded-lg px-4">
            <AccordionTrigger className="text-right">
              🎯 ما الفرق بين المطابقة الدقيقة والضبابية؟
            </AccordionTrigger>
            <AccordionContent className="text-right text-muted-foreground">
              <div className="space-y-2">
                <p><strong>المطابقة الدقيقة (Exact):</strong> تبحث عن الكلمة بالضبط كما كتبتها.</p>
                <p><strong>المطابقة الضبابية (Fuzzy):</strong> تبحث عن الكلمة حتى مع اختلافات بسيطة في الكتابة أو الأخطاء الإملائية.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notifications" className="border rounded-lg px-4">
            <AccordionTrigger className="text-right">
              📨 كيف أتحكم في الإشعارات؟
            </AccordionTrigger>
            <AccordionContent className="text-right text-muted-foreground">
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong>نوع الإشعار:</strong> اختر استلام الإشعارات في محادثة خاصة أو مجموعة</li>
                <li><strong>فترة الإشعارات:</strong> تحكم في تكرار الإشعارات (فوري، كل دقيقة، إلخ)</li>
                <li><strong>حد طول الرسالة:</strong> حدد الحد الأقصى لعدد الأحرف في الإشعار</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="groups" className="border rounded-lg px-4">
            <AccordionTrigger className="text-right">
              👥 كيف أضيف مجموعة للإشعارات؟
            </AccordionTrigger>
            <AccordionContent className="text-right text-muted-foreground">
              <ol className="list-decimal list-inside space-y-2 pr-4">
                <li>أضف البوت للمجموعة المطلوبة</li>
                <li>استخدم أمر /id للحصول على معرف الدردشة</li>
                <li>اذهب لصفحة "إدارة المجموعات"</li>
                <li>أدخل اسم المجموعة ومعرف الدردشة</li>
                <li>اضغط "إضافة مجموعة"</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="smart-filter" className="border rounded-lg px-4">
            <AccordionTrigger className="text-right">
              🧠 ما هو فلتر الإعلانات الذكي؟
            </AccordionTrigger>
            <AccordionContent className="text-right text-muted-foreground">
              <p>
                هذه الميزة تستخدم الذكاء الاصطناعي لتصفية الرسائل الإعلانية والسبام تلقائياً. عند تفعيلها، لن تصلك إشعارات عن الرسائل التي يُحتمل أنها إعلانات.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="export" className="border rounded-lg px-4">
            <AccordionTrigger className="text-right">
              📤 كيف أحفظ نسخة احتياطية؟
            </AccordionTrigger>
            <AccordionContent className="text-right text-muted-foreground">
              <p className="mb-2">
                من صفحة "تصدير البيانات" يمكنك تصدير:
              </p>
              <ul className="list-disc list-inside space-y-1 pr-4">
                <li>الكلمات المفتاحية فقط</li>
                <li>القائمة السوداء فقط</li>
                <li>الإعدادات فقط</li>
                <li>نسخة احتياطية كاملة تشمل كل شيء</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Contact */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              هل تحتاج مساعدة إضافية؟ تواصل معنا عبر البوت
            </p>
            <p className="font-mono text-primary mt-2">/help</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
