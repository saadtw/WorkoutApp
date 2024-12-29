const trendingWorkouts = [
  {
    id: '1',
    title: 'Chest Pump',
    rating: '⭐ 4.9',
    imageSource: require('../assets/chest.png'),
    category: 'Chest',
  },
  {
    id: '2',
    title: 'Bicep Blast',
    rating: '⭐ 4.7',
    imageSource: require('../assets/biceps.png'),
    category: 'Biceps',
  },
  {
    id: '3',
    title: 'Cardio Burn',
    rating: '⭐ 4.8',
    imageSource: require('../assets/cardio.png'),
    category: 'Cardio',
  },
];

const trendingPlans = [
  {
    id: '1',
    title: 'Full Body Advanced',
    rating: '⭐ 5',
    imageSource: require('../assets/full.png'),
  },
  {
    id: '2',
    title: 'Basic Legs Workout',
    rating: '⭐ 4.7',
    imageSource: require('../assets/legs.png'),
  },
  {
    id: '3',
    title: 'Intermediate Abs Workout',
    rating: '⭐ 4.6',
    imageSource: require('../assets/abs.png'),
  },
];

export { trendingPlans, trendingWorkouts };
