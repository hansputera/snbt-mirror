{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs-slim_latest
    pkgs.python3
  ];

  env = {};
  idx = {
    extensions = [ 
      "biomejs.biome"
    ];

    previews = {
      enable = true;
      previews = {
      };
    };
  };
}
