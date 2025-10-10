
import { type Unit, type Achievement } from '../types';

export const initialUnits: Unit[] = [
  {
    id: 'unit1',
    title: 'الوحدة الأولى: المتتاليات والإثبات بالتدريج',
    lessons: [
      { id: 'u1l1', title: 'مبدأ الإثبات بالتدريج', completed: false, xpValue: 100, confidence: '🤔', note: '' },
      { id: 'u1l2', title: 'تعريف المتتالية وطرائق تعريفها', completed: false, xpValue: 50, confidence: '🤔', note: '' },
      { id: 'u1l3', title: 'المتتاليات المطردة والمحدودة', completed: false, xpValue: 75, confidence: '🤔', note: '' },
      { id: 'u1l4', title: 'المتتاليات الحسابية والهندسية', completed: false, xpValue: 150, confidence: '🤔', note: '' },
    ]
  },
  {
    id: 'unit2',
    title: 'الوحدة الثانية: النهايات والاستمرار',
    lessons: [
      { id: 'u2l1', title: 'نهاية متتالية', completed: false, xpValue: 100, confidence: '🤔', note: '' },
      { id: 'u2l2', title: 'نهاية تابع عند اللانهاية', completed: false, xpValue: 125, confidence: '🤔', note: '' },
      { id: 'u2l3', title: 'نهاية تابع عند عدد حقيقي', completed: false, xpValue: 150, confidence: '🤔', note: '' },
      { id: 'u2l4', title: 'الاستمرار', completed: false, xpValue: 100, confidence: '🤔', note: '' },
    ]
  },
  {
    id: 'unit3',
    title: 'الوحدة الثالثة: الاشتقاق وتطبيقاته',
    lessons: [
      { id: 'u3l1', title: 'تعريف العدد المشتق', completed: false, xpValue: 100, confidence: '🤔', note: '' },
      { id: 'u3l2', title: 'قواعد الاشتقاق', completed: false, xpValue: 150, confidence: '🤔', note: '' },
      { id: 'u3l3', title: 'دراسة التغيرات ورسم الخطوط البيانية', completed: false, xpValue: 250, confidence: '🤔', note: '' },
    ]
  },
   {
    id: 'unit4',
    title: 'الوحدة الرابعة: التابع اللوغاريتمي والآسي',
    lessons: [
      { id: 'u4l1', title: 'التابع اللوغاريتمي', completed: false, xpValue: 150, confidence: '🤔', note: '' },
      { id: 'u4l2', title: 'التابع الآسي', completed: false, xpValue: 150, confidence: '🤔', note: '' },
      { id: 'u4l3', title: 'حل المعادلات والمتراجحات', completed: false, xpValue: 125, confidence: '🤔', note: '' },
    ]
  },
  {
    id: 'unit5',
    title: 'الوحدة الخامسة: التكامل',
    lessons: [
        { id: 'u5l1', title: 'التوابع الأصلية', completed: false, xpValue: 150, confidence: '🤔', note: '' },
        { id: 'u5l2', title: 'التكامل المحدود وخواصه', completed: false, xpValue: 175, confidence: '🤔', note: '' },
        { id: 'u5l3', title: 'حساب المساحات والحجوم', completed: false, xpValue: 250, confidence: '🤔', note: '' },
    ]
  }
];

export const initialAchievements: Achievement[] = [
  { id: 'first_step', title: 'أول خطوة!', description: 'أنجزت أول درس لك. بداية رائعة!', unlocked: false },
  { id: 'five_lessons', title: 'المنطلق', description: 'أكملت 5 دروس بنجاح. استمر في التقدم!', unlocked: false },
  { id: 'ten_lessons', title: 'المثابر', description: 'أكملت 10 دروس! أنت تكتسب زخماً حقيقياً.', unlocked: false },
  { id: 'first_note', title: 'المدون الدقيق', description: 'كتبت أول ملاحظة لك. تدوين الملاحظات مفتاح للنجاح.', unlocked: false },
  { id: 'unit1_conqueror', title: 'قاهر المتتاليات', description: 'أتقنت وحدة المتتاليات بالكامل.', unlocked: false },
  { id: 'unit2_conqueror', title: 'سيد النهايات', description: 'أتقنت وحدة النهايات والاستمرار.', unlocked: false },
  { id: 'unit3_conqueror', title: 'فنان الاشتقاق', description: 'أتقنت وحدة الاشتقاق وتطبيقاته.', unlocked: false },
  { id: 'unit4_conqueror', title: 'خبير اللوغاريتم', description: 'أتقنت وحدة التابع اللوغاريتمي والآسي.', unlocked: false },
  { id: 'unit5_conqueror', title: 'مهندس التكامل', description: 'أتقنت وحدة التكامل.', unlocked: false },
  { id: 'halfway', title: 'نصف الطريق', description: 'وصلت إلى 50% من إجمالي الإنجاز!', unlocked: false },
  { id: 'expert', title: 'خبير الجبر', description: 'أكملت جميع دروس الجبر بنجاح!', unlocked: false },
];