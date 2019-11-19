export interface Answers {
  value: string;
  correct?: false;
}

export interface Tags {
  tag: string;
}

export interface Subject {
  subject: string;
}

export interface Level {
  level: number;
}


export class QuestionModel {
  constructor(
    public subject: Subject,
    public group: string,
    public level: Level,
    public tags: Tags [],
    public question: string,
    public answers: Answers [],
    public id?: string,
  ) {
  }
}
