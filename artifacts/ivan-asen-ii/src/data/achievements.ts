export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export function getAchievements(
  stats: { military: number; diplomacy: number; prosperity: number },
  choiceIndices: number[],
  historicalCorrect: number
): Achievement[] {
  const earned: Achievement[] = [];
  const accuracy = Math.round((historicalCorrect / 15) * 100);

  if (accuracy >= 80) {
    earned.push({
      id: "historian",
      icon: "📜",
      title: "Историческият Иван Асен II",
      description: `${accuracy}% съвпадение с реалния цар`,
    });
  } else if (accuracy >= 60) {
    earned.push({
      id: "near-historian",
      icon: "📖",
      title: "Достоен Летописец",
      description: `${accuracy}% съвпадение с реалния цар`,
    });
  }

  if (stats.military >= 75) {
    earned.push({
      id: "warrior",
      icon: "⚔️",
      title: "Великият Воин",
      description: "Военна мощ достигна 75+",
    });
  }

  if (stats.diplomacy >= 75) {
    earned.push({
      id: "diplomat",
      icon: "🕊️",
      title: "Великият Дипломат",
      description: "Дипломация достигна 75+",
    });
  }

  if (stats.prosperity >= 75) {
    earned.push({
      id: "father",
      icon: "🌾",
      title: "Бащата на Народа",
      description: "Благоденствие достигна 75+",
    });
  }

  if (stats.military >= 60 && stats.diplomacy >= 60 && stats.prosperity >= 60) {
    earned.push({
      id: "sage",
      icon: "⚜️",
      title: "Мъдрецът",
      description: "Всички показатели над 60",
    });
  }

  if (choiceIndices[6] === 0) {
    earned.push({
      id: "builder",
      icon: "🏛️",
      title: "Строителят",
      description: "Издигна Църквата на 40 мъченици",
    });
  }

  if (choiceIndices[11] === 0) {
    earned.push({
      id: "protector",
      icon: "🛡️",
      title: "Защитникът",
      description: "Приюти куманите от монголите",
    });
  }

  if (choiceIndices[13] === 0) {
    earned.push({
      id: "lover",
      icon: "💛",
      title: "Влюбеният Цар",
      description: "Ожени се за Ирина Комнина",
    });
  }

  return earned;
}
