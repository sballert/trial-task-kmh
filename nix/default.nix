{ sources ? import ./sources.nix }:

let

  pkgs = import sources.nixpkgs { };

in
{
  inherit pkgs;

  devTools = {
    inherit (pkgs) niv bashInteractive;
  };
}
