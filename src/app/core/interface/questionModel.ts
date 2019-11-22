export interface QuestionData {
  data: {
    count: number;
    pageCount: number;
    questions: QuestionModel[]
  };
}

export interface Answers {
  value: string;
  correct?: false;
  id?: string;
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

export interface Groups {
  group: string;
}

export class QuestionModel {
  constructor(
    public subject: Subject,
    public group: Groups,
    public level: Level,
    public tags: Tags [],
    public question: string,
    public answers: Answers [],
    public id?: string
  ) {
  }
}

