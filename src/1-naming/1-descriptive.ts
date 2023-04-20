// ❌
// const width = 5; // 🤢 with of what?

// export class Image {
//   imageWidth = 5; // 🤢 redundant
// }

// ✅
const imageWidth = 5; // 😏 full context
export class Image {
  width = 5; // 😏 inferred from context
}
