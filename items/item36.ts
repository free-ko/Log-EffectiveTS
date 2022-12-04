// <해당 분야의 용어로 타입 이름 짓기>
// - data, info, thing, item, object, entity 같은 모호하고 의미 없는 이름은 지양
// - 이름을 지을 때는 포함된 내용이나 계산 방식이 아니라, '데이터 자체'가 무엇인지를 고려
// - 가독성을 높이고, 추상화 수준을 올리기 위해서 해당 분야의 용어를 사용
// - 같은 의미에 다른 이름을 붙이면 안됨. 특별한 의미가 있을 때만 용어를 구분

interface Animal {
  name: string;
  endangered: boolean;
  habitat: string;
}

const leopard: Animal = {
  name: "Snow Leopard",
  endangered: false,
  habitat: "tundra",
};

type ConservationStatus = "EX" | "EW" | "CR" | "EN" | "VU" | "NT" | "LC";

type KoppenClimate = "Af" | "Am" | "As" | "Aw";

interface NewAnimal {
  commonName: string;
  genus: string;
  species: string;
  status: ConservationStatus;
  climates: KoppenClimate[];
}

const snowLeopard: NewAnimal = {
  commonName: "Snow Leopard",
  genus: "Panthera",
  species: "Uncia",
  status: "EX",
  climates: ["Af", "Am"],
};
