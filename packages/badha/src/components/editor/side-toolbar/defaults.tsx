import { nanoid } from "../../../utils";
const id = nanoid();

export const HEADING = "HEADING";
export const PARAGRAPH = "PARAGRAPH";
export const IMAGE_SINGLE = "IMAGE_SINGLE";
export const IMAGE_GALLERY = "IMAGE_GALLERY";
export const QUOTE = "QUOTE";
export const EMBED = "EMBED";
export const BULLET_LIST = "BULLET_LIST";
export const NUMBERED_LIST = "NUMBERED_LIST";

type Nodes = {
  [key: string]: any;
};

const defaults: Nodes = {
  PARAGRAPH: {
    id: id,
    type: "paragraph",
    children: [
      {
        text: "...",
      },
    ],
  },
  HEADING: {
    id: id,
    type: "heading-base",
    children: [
      {
        text: "heading",
      },
    ],
  },
  QUOTE: {
    id: id,
    type: "block-quote",
    media: null,
    quoteBy: "",
    children: [
      {
        text: "quote",
      },
    ],
  },

  BULLET_LIST: {
    id: id,
    type: "bulleted-list",
    title: null,
    children: [
      {
        id: nanoid(5),
        type: "list-item",
        children: [
          {
            text: "",
          },
        ],
      },
    ],
  },
  NUMBERED_LIST: {
    id: id,
    type: "numbered-list",
    title: null,
    children: [
      {
        id: nanoid(5),
        type: "list-item",
        children: [
          {
            text: "",
          },
        ],
      },
    ],
  },
  EMBED: {
    id: id,
    type: "embed",
    url: null,
    content: null,
    children: [
      {
        text: "",
      },
    ],
  },
  IMAGE_SINGLE: {
    id: id,
    type: "image-singe",
    expand: false,
    media: {
      url: null,
      type: "image",
      meta: {
        thumbnail: "",
      },
      caption: {
        text: "",
        creditsTo: "",
        creditsToUrl: "",
      },
    },
    children: [
      {
        text: "",
      },
    ],
  },
  VIDEO_SINGLE: {
    id: id,
    type: "image-singe",
    expand: false,
    media: {
      url: null,
      type: "image",
      meta: {
        time: "",
        thumbnail: "",
      },
      caption: {
        text: "",
        creditsTo: "",
        creditsToUrl: "",
      },
    },
    children: [
      {
        text: "",
      },
    ],
  },
  IMAGE_GALLERY: {
    id: id,
    type: "image-gallery",
    expand: false,
    media: [],
    children: [
      {
        text: "",
      },
    ],
  },
};

export const insertNode = (type: string): any => {
  return defaults[type];
};
