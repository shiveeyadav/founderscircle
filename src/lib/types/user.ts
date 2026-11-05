import type { Theme, Accent } from './theme';
import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type {
  FounderRole,
  CompanyStage,
  Industry,
  LookingFor
} from '@lib/founder';

export type User = {
  id: string;
  bio: string | null;
  name: string;
  theme: Theme | null;
  accent: Accent | null;
  website: string | null;
  location: string | null;
  username: string;
  photoURL: string;
  verified: boolean;
  following: string[];
  followers: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  totalTweets: number;
  totalPhotos: number;
  pinnedTweet: string | null;
  coverPhotoURL: string | null;
  /** how often to email a round-up of new posts; undefined means never set */
  emailDigest?: EmailDigestFrequency;
  /*
   * Founder profile. Optional so documents created before these fields
   * existed (or by older clients) still type-check and render.
   */
  company?: string | null;
  role?: FounderRole | null;
  industry?: Industry | null;
  stage?: CompanyStage | null;
  lookingFor?: LookingFor[];
  canHelpWith?: string | null;
};

export type EmailDigestFrequency = 'off' | 'daily' | 'weekly';

export type EditableData = Extract<
  keyof User,
  'bio' | 'name' | 'website' | 'photoURL' | 'location' | 'coverPhotoURL'
>;

/** Free-text founder fields edited with a plain text input. */
export type FounderTextData = Extract<keyof User, 'company' | 'canHelpWith'>;

export type FounderData = Pick<
  User,
  'company' | 'role' | 'industry' | 'stage' | 'lookingFor' | 'canHelpWith'
>;

export type EditableUserData = Pick<User, EditableData>;

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as User;
  }
};
