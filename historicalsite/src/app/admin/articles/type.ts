export interface ArticleBase {
  articleId: string | number;
  articleType: "PERSON" | "EVENT";
  articleName: string;
}

export interface Person extends ArticleBase {
  personName: string;
  birthYear: number;
  deathYear?: number;
  articleType: "PERSON";
}

export interface Event extends ArticleBase {
  topicName: string;
  periodName: string;
  articleType: "EVENT";
}