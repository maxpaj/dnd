import { Id, generateId } from "../id";
import {
  Campaign,
  CampaignEvent,
  CampaignEventType,
} from "../campaign/campaign";
import { ActionType, Character } from "../character/character";
import { getCharacterInitiative } from "../character/character-stats";

export type Round = {
  id: Id;
};

export class BattleCharacter {
  public characterId!: Id;
  public initiative!: number;

  public constructor(init?: Partial<BattleCharacter>) {
    Object.assign(this, init);
  }

  applyEvent(event: CampaignEvent, campaign: Campaign) {}
}

export class Battle {
  public id: Id;
  public characters: BattleCharacter[];

  public constructor(characters: BattleCharacter[] = []) {
    this.id = generateId("battle");
    this.characters = characters;
  }

  hasRolledForInitiative() {
    return this.characters.every((c) => c.initiative != 0);
  }

  addCharacterToCurrentBattle(character: Character) {
    const added = new BattleCharacter({
      characterId: character.id,
      initiative: getCharacterInitiative(character),
    });
    this.characters.push(added);
    return added;
  }

  currentCharacterTurn(events: CampaignEvent[]) {
    const charactersNotActedCurrentRound = this.characters.filter(
      (battleChar) => {
        const hasActed = events.some(
          (e) =>
            e.characterId === battleChar.characterId &&
            e.eventType === CampaignEventType.CharacterEndRound
        );

        return !hasActed;
      }
    );

    const sorted = charactersNotActedCurrentRound.sort(
      (a, b) => b.initiative - a.initiative
    );

    return sorted[0];
  }

  publishNewRoundEvent(nextRoundId: string) {
    return {
      id: generateId("event"),
      eventType: CampaignEventType.NewRound,
      actionType: ActionType.None,
      characterId: "system",
      roundId: nextRoundId,
      battleId: this.id,
    };
  }
}
