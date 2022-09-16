{ nix ? import ./nix { } }:

nix.pkgs.mkShell {
  buildInputs = builtins.attrValues nix.devTools;

  shellHook = ''
    ${nix.ci.pre-commit-check.shellHook}
  '';
}
