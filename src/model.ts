/* eslint-disable */

// @ts-ignore
interface ResultResponse {
  result: boolean
}

/**
 * USER
 */
interface CreateUserResponse {
  id: number;
}

interface UpdateUserRequest {
  userId: number;
  coordinate: CoordinateDto;
  movement: MovementStatus;
}

interface UpdateUserResponse {
  userId: number;
  nickname: string;
  coordinate: CoordinateDto;
  movement: MovementStatus;
  missionStatus: boolean;
  teases: Tease[];
  connectedUserId: number | null;
  npc: boolean;
  userIdForNpc: number | null;
}

interface CoordinateDto {
  latitude: number;
  longitude: number;
}


type MovementStatus = 'STAND' | 'SIT' | 'WALK'

interface Tease {
  from: number;
  to: number;
  message: string | null;
  mission: Mission;
  userId: number | null;
}

/**
 * MISSION
 */
type Mission = 'SHAKE_IT' | 'JUMPING_JACK' | 'WALK'


/**
 * TAKE
 */
interface TakeRequest {
    userId: number
    npcId: number
}


/**
 * TEASE
 */
interface TeaseRequest {
  userId: number
  npcId: number
  message: string | null
  mission: Mission | null
}
