{ nix ? import ./nix { } }:

nix.pkgs.mkShell {
  buildInputs = builtins.attrValues nix.devTools;
}
