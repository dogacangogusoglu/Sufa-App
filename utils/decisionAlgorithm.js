const sentimentalMap = {
  Yes: 1,
  No: 0
};

const conditionMap = {
  recycle: {
    "Unwearable": 1.0,
    "Some damage": 0.5,
    "New / Excellent": 0.0
  },
  donate: {
    "New / Excellent": 1.0,
    "Some damage": 0.5,
    "Unwearable": 0.0
  },
  upcycle: {
    "Some damage": 1.0,
    "New / Excellent": 0.5,
    "Unwearable": 0.5
  }
};

const materialMap = {
  recycle: {
    "100% Cotton / Linen": 0.9,
    "Polyester blend": 0.2,
    "Non-recyclable": 0.0
  },
  donate: {
    "100% Cotton / Linen": 0.7,
    "Polyester blend": 0.4,
    "Non-recyclable": 0.1
  },
  upcycle: {
    "100% Cotton / Linen": 0.0,
    "Polyester blend": 0.7,
    "Non-recyclable": 1.0
  }
};

const priceMap = {
  recycle: {
    "Free / gifted": 1.0,
    "0-3000": 0.6,
    "3000 TL +": 0.2
  },
  donate: {
    "Free / gifted": 1.0,
    "0-3000": 0.6,
    "3000 TL +": 0.8
  },
  upcycle: {
    "Free / gifted": 1.0,
    "0-3000": 0.6,
    "3000 TL +": 0.2
  }
};

const infrastructureMap = {
  recycle: {
    "Recycling bin and Upcycling options nearby": 1.0,
    "Needs transport or shipping": 0.5,
    "No known recycling  or upcycling options": 0.0
  },
  donate: {
    "Recycling bin nearby (same day)": 1.0,
    "Needs transport or shipping": 0.5,
    "No known recycling options": 0.0
  },
  upcycle: {
    "Recycling bin and Upcycling options nearby": 1.0,
    "Needs transport or shipping": 0.5,
    "No known recycling  or upcycling options": 0.0
  }
};

const weights = {
  recycle: {
    usage: 0.3,
    material: 0.3,
    price: 0.15,
    infrastructure: 0.2,
    sentimental: 0.05
  },
  donate: {
    usage: 0.25,
    material: 0.2,
    price: 0.2,
    infrastructure: 0.2,
    sentimental: 0.15
  },
  upcycle: {
    usage: 0.25,
    material: 0.2,
    price: 0.1,
    infrastructure: 0.2,
    sentimental: 0.2
  }
};

export function calculateDecisionScores(input) {
  const scores = {};

  for (const option of ["recycle", "donate", "upcycle"]) {
    const w = weights[option];

    const usageScore = conditionMap[option][input.usage] ?? 0;
    const materialScore = materialMap[option][input.material] ?? 0;
    const priceScore = priceMap[option][input.price] ?? 0;
    const infraScore = infrastructureMap[option][input.infrastructure] ?? 0;
    const sentimentalScore = sentimentalMap[input.sentimental] ?? 0;

    const total =
      usageScore * w.usage +
      materialScore * w.material +
      priceScore * w.price +
      infraScore * w.infrastructure +
      sentimentalScore * w.sentimental;

    scores[option] = total.toFixed(3);
  }

  const recommendation = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  return { scores, recommendation };
}
