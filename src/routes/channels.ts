import { Router } from "express";

const channelsRouter = Router();

const channelsData = [
  {
    id: "1",
    name: "paracetomol",
  },
  {
    id: "2",
    name: "ibuprofen",
  },
];

channelsRouter.get("/", (request, response) => {
  response.json(channelsData);
});

channelsRouter.get("/:id", (request, response) => {
  const id = request.params.id;

  const channel = channelsData.find((item) => item.id === id);

  if (!channel) {
    response.status(404).json({
      message: `channel not found ${id}`,
    });
  }

  response.json(channel);
});

channelsRouter.post("/", (request, response) => {
  const newChannel = {
    id: String(channelsData.length + 1),
    name: request.body.name,
  };

  channelsData.push(newChannel);

  response.json(newChannel);
});

channelsRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const updateData = request.body;

  const channelToUpdate = channelsData.find((channel) => channel.id === id);

  if (!channelToUpdate) {
    response.status(404).json({
      message: `channel not found ${id}`,
    });

    return;
  }

  channelToUpdate.name = request.body.name;

  response.json(channelToUpdate);
});

export { channelsRouter };
