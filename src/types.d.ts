type State = {
  backgroundReady: boolean;
  popupReady: boolean;
};

type RockstarAccount = {
  rockstarId: number;
  name: string;
  displayName: string;
  avatarUrl: string;
  primaryClanId: number;
  primaryClanRankOrder: number;
  isClanMate: boolean;
  countryCode: string;
  relationship: string;
  mutualFriendCount: number;
  profileHidden: boolean;
  friendsHidden: boolean;
  friendCount: number;
  wallHidden: boolean;
  allowWallPost: boolean;
  allowStatCompare: boolean;
  allowBlock: boolean;
  allowReport: boolean;
  background: string;
  isGamertagHidden: boolean;
};

type RockstarFetchAccountsResponse = {
  viewerRockstarId: number;
  accounts: [
    {
      rockstarAccount: RockstarAccount;
    }
  ];
  status: boolean;
};
