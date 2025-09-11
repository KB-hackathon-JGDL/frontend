import { defineStore } from 'pinia';
import type { Question, ChoiceKey } from '@/types/survey';

export type PersonaLite = {
  key: string;
  name: string;
  blurb: string;
  icon?: string;
};

export type Product = {
  title: string;
  rate?: { min: number; max: number; asOf?: string };
};

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    step: 1,
    questions: [] as Question[],
    answers: {} as Record<number, ChoiceKey | undefined>,
    persona: null as PersonaLite | null,
    recommendations: {} as Record<string, Product[]>,
    surveyCompleted: false,
  }),

  getters: {
    total: (s) => s.questions.length,
    currentQuestion: (s) => s.questions.find((q) => q.id === s.step),
    isLast: (s) => s.step >= s.questions.length,
    scoresByQ: (s) => {
      const scores: Record<number, number> = {};
      s.questions.forEach((q) => {
        const key = s.answers[q.id];
        const found = key ? q.options.find((o) => o.key === key) : undefined;
        scores[q.id] = found?.score ?? 0;
      });
      return scores;
    },

    results(): {
      assetStability: number;
      spendingPlan: number;
      savingRegularity: number;
      priorityGoal: number;
    } {
      const sc = this.scoresByQ;
      const avg = (nums: number[]) =>
        nums.length
          ? +(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2)
          : 0;

      return {
        assetStability: avg([sc[1], sc[2]]),
        spendingPlan: sc[5] ?? 0,
        savingRegularity: avg([sc[4], sc[6], sc[8]]),
        priorityGoal: avg([sc[3], sc[7], sc[9]]),
      };
    },

    // ✅ 어떤 경우에도 최소 3개 기본 추천 반환
    recommendedProducts(state): Product[] {
      const personaRecs = state.persona
        ? state.recommendations[state.persona.name] ?? []
        : [];

      const anyRecs = state.recommendations['any'] ?? [];

      // 무조건 fallback 3개
      const fallback: Product[] = [
        { title: 'KB 특★한 적금',   rate: { min: 2.0,  max: 6.0 } },
        { title: 'KB 내맘대로 적금', rate: { min: 2.3,  max: 3.55 } },
        { title: 'KB 맑은하늘 적금', rate: { min: 2.45, max: 3.85 } },
      ];

      const combined = [...personaRecs, ...anyRecs];
      return combined.length > 0 ? combined : fallback;
    },
  },

  actions: {
    saveToStorage() {
      try {
        localStorage.setItem('survey_persona', JSON.stringify(this.persona));
        localStorage.setItem(
          'survey_recs',
          JSON.stringify(this.recommendations)
        );
        localStorage.setItem(
          'survey_completed',
          this.surveyCompleted ? '1' : '0'
        );
      } catch {}
    },
    hydrateFromStorage() {
      try {
        const p = localStorage.getItem('survey_persona');
        const r = localStorage.getItem('survey_recs');
        const c = localStorage.getItem('survey_completed');
        if (p) this.persona = JSON.parse(p);
        if (r) this.recommendations = JSON.parse(r);
        this.surveyCompleted = c === '1';
      } catch {}
    },
    clearStorage() {
      try {
        localStorage.removeItem('survey_persona');
        localStorage.removeItem('survey_recs');
        localStorage.removeItem('survey_completed');
      } catch {}
    },
    hydrate() {
      this.hydrateFromStorage();
    },
    markSurveyCompleted() {
      this.surveyCompleted = true;
      this.saveToStorage();
    },

    init() {
      if (this.questions.length) return;
      this.questions = [
        {
          id: 1,
          title: '1. 목돈이 생겼을 때, 가장 먼저 드는 생각은?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            { key: 'A', label: '투자나 재테크로 불리고 싶다.', score: 1 },
            {
              key: 'B',
              label: '사기당하지 않고 안전하게 지키고 싶다.',
              score: 3,
            },
            { key: 'C', label: '필요한 물건이나 경험에 쓰고 싶다.', score: 2 },
          ],
        },
        {
          id: 2,
          title: '2. 금융이나 돈 관리에 대해, 평소 어떻게\n느끼시나요?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            {
              key: 'A',
              label: '너무 어렵고, 누가 알려줬으면 좋겠다.',
              score: 3,
            },
            { key: 'B', label: '더 똑똑하게 관리하고 싶다.', score: 2 },
            { key: 'C', label: '일단 부딪히면서 배운다.', score: 1 },
          ],
        },
        {
          id: 3,
          title: '3. 요즘 돈과 관련해서 가장 큰 고민은?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            { key: 'A', label: '월세, 공과금 등 매달 나가는 생활비', score: 3 },
            {
              key: 'B',
              label: '학비, 기술 교육 등 미래를 위한 준비 자금',
              score: 1,
            },
            {
              key: 'C',
              label: '갑자기 아프거나 급한 일이 생겼을 때 쓸 돈',
              score: 2,
            },
          ],
        },
        {
          id: 4,
          title: '4. 매달 들어오는 돈은 어떻게 관리하나요?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            {
              key: 'A',
              label: '불규칙해서 돈이 생길 때마다 아껴 쓴다.',
              score: 1,
            },
            {
              key: 'B',
              label: '정기적인 수입이 있어 계획을 세워 관리한다.',
              score: 3,
            },
            { key: 'C', label: '일단 쓰고 남는 돈을 저축한다.', score: 1 },
          ],
        },
        {
          id: 5,
          title: '5. 무언가 사고 싶을 때, 나는 어떤 편인가요?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            { key: 'A', label: '신중하게 고민하고 구매한다.', score: 3 },
            {
              key: 'B',
              label: '가격 비교 후 마음에 들면 일단 사는 편이다.',
              score: 2,
            },
            { key: 'C', label: '사고 싶으면 바로 사야 한다.', score: 1 },
          ],
        },
        {
          id: 6,
          title: '6. 작은 돈을 아껴 모으는 습관이 있나요?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            { key: 'A', label: '꾸준히 실천하고 있다.', score: 3 },
            {
              key: 'B',
              label: '시도는 했지만 꾸준히 하기는 어렵다.',
              score: 2,
            },
            {
              key: 'C',
              label: '작은 돈보다는 큰돈을 모으는 게 효과적이다.',
              score: 1,
            },
          ],
        },
        {
          id: 7,
          title: '7. 지금 돈을 모은다면, 가장 이루고 싶은\n목표는?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            {
              key: 'A',
              label: '안정적인 나만의 공간(보증금, 월세) 마련',
              score: 3,
            },
            {
              key: 'B',
              label: '원하는 공부나 기술을 배우기 위한 교육비 마련',
              score: 1,
            },
            { key: 'C', label: '평소 갖고 싶었던 물건 구매', score: 3 },
          ],
        },
        {
          id: 8,
          title:
            '8. 어떤 방식으로 저축하는 것이 가장 마음\n편하고 꾸준히 할 수 있을까요?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            {
              key: 'A',
              label: '매달 같은 금액을 꾸준히 모으는 방식',
              score: 3,
            },
            {
              key: 'B',
              label: '돈이 생길 때마다 원하는 만큼 자유롭게 모으는 방식',
              score: 1,
            },
            { key: 'C', label: '단기간에 집중해서 바짝 모으는 방식', score: 2 },
          ],
        },
        {
          id: 9,
          title:
            '9. 카드나 통장을 고를 때,\n어떤 점이 가장 중요하다고\n생각하세요?',
          caption: '해당되는 항목에 체크해주세요.',
          options: [
            { key: 'A', label: '교통비, 편의점 등 할인/혜택', score: 3 },
            { key: 'B', label: '복잡한 조건 없이 쉬운 사용법', score: 1 },
            {
              key: 'C',
              label: '예쁘거나 좋아하는 캐릭터가 있는 디자인',
              score: 2,
            },
          ],
        },
      ];
    },

    select(qid: number, key: ChoiceKey) {
      this.answers[qid] = key;
    },
    next() {
      if (this.step < this.questions.length) this.step++;
    },
    prev() {
      if (this.step > 1) this.step--;
    },
    reset() {
      this.step = 1;
      this.answers = {};
      this.persona = null;
      this.surveyCompleted = false;
    },

    derivePersona() {
      const norm = (v: number) => Math.max(0, Math.min(1, (v - 1) / 2));
      const r = this.results;
      const asset = norm(r.assetStability);
      const planSpend = norm(r.spendingPlan);
      const regular = norm(r.savingRegularity);
      const short = norm(r.priorityGoal);

      const axes = {
        activity: 0.5 * (1 - asset) + 0.25 * regular + 0.25 * short,
        consume: 1 - planSpend,
        planning: regular,
        risk: 1 - asset,
      };

      const PERSONAS_FULL = [
        {
          key: 'stable',
          name: '안정적인 관리자',
          blurb:
            '변동성 있는 상품보다는 원금 보존을 최우선으로 생각해요. 예측 가능한 수익을 꾸준히 쌓아가는 것을 선호하며, 돈을 안전하게 지키는 것을 중요하게 생각합니다.',
          icon: 'shield',
          vec: { activity: 0.25, consume: 0.2, planning: 0.9, risk: 0.15 },
        },
        {
          key: 'planner',
          name: '현실적인 계획가',
          blurb:
            '미래에 이루고 싶은 목표(예: 전세 보증금 마련)를 위해 구체적인 계획을 세우고, 그에 맞춰 꾸준히 자금을 모으는 데 집중합니다.',
          icon: 'clipboard-check',
          vec: { activity: 0.4, consume: 0.3, planning: 0.8, risk: 0.25 },
        },
        {
          key: 'explorer',
          name: '자유로운 탐험가',
          blurb:
            '복잡한 조건이나 기간에 얽매이지 않고, 자유롭게 돈을 입금하거나 관리하며 금융 상품을 통해 새로운 경험을 즐기는 것을 좋아해요.',
          icon: 'compass',
          vec: { activity: 0.6, consume: 0.7, planning: 0.3, risk: 0.6 },
        },
        {
          key: 'smart',
          name: '스마트한 투자자',
          blurb:
            '은행 거래 실적, 카드 사용, 다른 금융 상품 동시 가입 등 다양한 조건을 충족해 최대한 높은 우대금리를 받는 데 능숙합니다.',
          icon: 'brain',
          vec: { activity: 0.7, consume: 0.4, planning: 0.8, risk: 0.6 },
        },
        {
          key: 'relaxed',
          name: '느긋한 모험가',
          blurb:
            '환경 보호, 지역 사회 기부 등 금융 상품이 가진 부가적인 사회적 가치에 관심을 갖고, 느긋하게 참여하는 것을 중요하게 생각합니다.',
          icon: 'leaf',
          vec: { activity: 0.5, consume: 0.5, planning: 0.5, risk: 0.4 },
        },
        {
          key: 'yolo',
          name: '현재를 즐기는 욜로족',
          blurb:
            '비교적 짧은 기간 안에 작은 목표를 달성하며 성취감을 느끼고, 금융 상품을 재미있는 챌린지처럼 활용하는 것을 즐겨요.',
          icon: 'party-popper',
          vec: { activity: 0.8, consume: 0.7, planning: 0.3, risk: 0.65 },
        },
        {
          key: 'practical',
          name: '실용적 준비자',
          blurb:
            '복잡한 우대 조건 없이 꼭 필요한 혜택만 제공하는 상품을 선호하며, 자신의 금융 목표를 효율적으로 달성하기 위해 실용적인 방법을 찾습니다.',
          icon: 'wrench',
          vec: { activity: 0.35, consume: 0.3, planning: 0.6, risk: 0.25 },
        },
        {
          key: 'energizer',
          name: '비전 있는 자수성가형',
          blurb:
            '특정 상황에 있는 사람들을 위한 특별한 상품을 활용해 더 높은 금리 혜택을 받으며 자산 성장의 발판을 마련합니다.',
          icon: 'bolt',
          vec: { activity: 0.85, consume: 0.6, planning: 0.4, risk: 0.7 },
        },
      ] as const;

      const dist = (p: (typeof PERSONAS_FULL)[number]) =>
        Math.hypot(
          p.vec.activity - axes.activity,
          p.vec.consume - axes.consume,
          p.vec.planning - axes.planning,
          p.vec.risk - axes.risk
        );

      const best = [...PERSONAS_FULL].sort((a, b) => dist(a) - dist(b))[0];
      this.persona = {
        key: best.key,
        name: best.name,
        blurb: best.blurb,
        icon: best.icon,
      };
      this.saveToStorage();
    },

    setRecommendations(personaName: string, products: Product[]) {
      this.recommendations[personaName] = products;
      this.saveToStorage();
    },
  },
});
