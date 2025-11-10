// graphData.js
export const graph = {
  Delhi: { Agra: 233, Jaipur: 280 },
  Agra: { Delhi: 233, Kanpur: 285 },
  Jaipur: { Delhi: 280, Udaipur: 394 },
  Kanpur: { Agra: 285, Lucknow: 90 },
  Lucknow: { Kanpur: 90, Varanasi: 320 },
  Udaipur: { Jaipur: 394 },
  Varanasi: { Lucknow: 320 },
};
