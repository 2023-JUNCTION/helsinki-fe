import React from 'react';
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
  daniel_dance: FUTURE_BOY_DANCE,
  me_jumping_jacks: BOMB_HAIR_JUMPING_JACKS,
  me_sitting: BOMB_HAIR_SITTING,
  me_standing: BOMB_HAIR_STANDING,
  me_walking: BOMB_HAIR_WAKING,
  jenny_laying_down: CROWN_GIRL_LAYING_DOWN,
  jenny_sit_up: CROWN_GIRL_SIT_UP,
  jenny_stand_up: CROWN_GIRL_STAND_UP,
  jenny_walking: CROWN_GIRL_WALKING,
  holden_sitting: HEADPHONE_BOY_SITTING,
  hazel_jumping_jacks: PURPLE_HAIR_JUMPING_JACKS,
  hazel_hair_texting: PURPLE_HAIR_TEXTING,
  lay_walking: RED_HAIR_WALKING,
};

type Props = {
  isBad?: boolean;
  isNickname?: boolean;
  isTeaseTag?: boolean;
  type?:
    | 'daniel_dance'
    | 'me_jumping_jacks'
    | 'me_sitting'
    | 'me_standing'
    | 'me_walking'
    | 'jenny_laying_down'
    | 'jenny_sit_up'
    | 'jenny_stand_up'
    | 'jenny_walking'
    | 'holden_sitting'
    | 'hazel_jumping_jacks'
    | 'hazel_hair_texting'
    | 'lay_walking';
};

const Character = ({ type = 'lay_walking', isBad = false, isNickname = false, isTeaseTag = true }: Props) => {
  return (
    <div className={styles.container}>
      {isNickname && <div className={styles.title}>{type.split('_')[0]}</div>}
      {isBad && <div className={styles.bad_person} />}
      {isTeaseTag && <img className={styles.is_tease_tag} src="/teasetag.png" alt="teasetag" />}
      <CanvasImageSequence fps={30} loop autoPlay data={CHARACTER_TYPE[type]} />
    </div>
  );
};

export default Character;
