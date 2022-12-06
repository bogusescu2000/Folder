const getRandomColor = () => {
  var colors = [
    "aliceblue",
    "beige",
    "bisque",
    "cornsilk",
    "khaki",
    "lightblue",
    "lightgoldenrodyellow",
    "lightpink",
    "lightyellow",
    "linen",
    "mistyrose",
    "peachpuff",
    "paleturquoise",
    "papayawhip",
    "pink",
    "thistle",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return randomColor;
};

export default getRandomColor;
