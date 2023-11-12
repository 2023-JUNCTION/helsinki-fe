import React from 'react';
import cn from 'classnames';
import CanvasImageSequence from 'react-canvas-image-sequence';

import styles from './Character.module.scss';

const FUTURE_BOY_DANCE = Array.from(
  { length: 81 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/dancing NPC(future boy)_dancing${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const BOMB_HAIR_JUMPING_JACKS = Array.from(
  { length: 33 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Junctioner(bomb hair)_JumpingJacks${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const BOMB_HAIR_SITTING = Array.from(
  { length: 40 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Junctioner(bomb hair)_Sitting${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const BOMB_HAIR_STANDING = Array.from(
  { length: 40 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Junctioner(bomb hair)_Standing${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const BOMB_HAIR_WAKING = Array.from(
  { length: 30 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Junctioner(bomb hair)_Waking${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const CROWN_GIRL_LAYING_DOWN = Array.from(
  { length: 52 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/lying down NPC(crown girl)_Laying down${String(
      i,
    ).padStart(2, '0')}.png`,
);

const CROWN_GIRL_SIT_UP = Array.from(
  { length: 50 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/lying down NPC(crown girl)_situp${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const CROWN_GIRL_STAND_UP = Array.from(
  { length: 50 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/lying down NPC(crown girl)_stand up${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const CROWN_GIRL_WALKING = Array.from(
  { length: 30 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/lying down NPC(crown girl)_walking${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const HEADPHONE_BOY_SITTING = Array.from(
  { length: 43 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Sitting NPC(headphone boy)_Sitting${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const PURPLE_HAIR_JUMPING_JACKS = Array.from(
  { length: 33 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Smombie NPC(purple hair)_Jumping jacks${String(
      i,
    ).padStart(2, '0')}.png`,
);

const PURPLE_HAIR_TEXTING = Array.from(
  { length: 41 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Smombie NPC(purple hair)_Texting${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const RED_HAIR_WALKING = Array.from(
  { length: 43 },
  (_v, i) =>
    `https://raw.githubusercontent.com/2023-JUNCTION/cdn/main/Walking NPC(Red hair)_Walking${String(i).padStart(
      2,
      '0',
    )}.png`,
);

const CHARACTER_TYPE = {
  FUTURE_BOY_DANCE,
  BOMB_HAIR_JUMPING_JACKS,
  BOMB_HAIR_SITTING,
  BOMB_HAIR_STANDING,
  BOMB_HAIR_WAKING,
  CROWN_GIRL_LAYING_DOWN,
  CROWN_GIRL_SIT_UP,
  CROWN_GIRL_STAND_UP,
  CROWN_GIRL_WALKING,
  HEADPHONE_BOY_SITTING,
  PURPLE_HAIR_JUMPING_JACKS,
  PURPLE_HAIR_TEXTING,
  RED_HAIR_WALKING,
};

type Props = {
  isBad?: boolean;
  type?:
    | 'FUTURE_BOY_DANCE'
    | 'BOMB_HAIR_JUMPING_JACKS'
    | 'BOMB_HAIR_SITTING'
    | 'BOMB_HAIR_STANDING'
    | 'BOMB_HAIR_WAKING'
    | 'CROWN_GIRL_LAYING_DOWN'
    | 'CROWN_GIRL_SIT_UP'
    | 'CROWN_GIRL_STAND_UP'
    | 'CROWN_GIRL_WALKING'
    | 'HEADPHONE_BOY_SITTING'
    | 'PURPLE_HAIR_JUMPING_JACKS'
    | 'PURPLE_HAIR_TEXTING'
    | 'RED_HAIR_WALKING';
};

const Character = ({ type = 'BOMB_HAIR_WAKING', isBad = false }: Props) => {
  return (
    <div className={styles.container}>
      <div className={cn(isBad && styles.bad_person)} />
      <CanvasImageSequence fps={30} loop autoPlay data={CHARACTER_TYPE[type]} />
    </div>
  );
};

export default Character;
