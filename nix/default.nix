{ sources ? import ./sources.nix }:

let

  pkgs = import sources.nixpkgs { };

  pre-commit-hooks = (import sources."pre-commit-hooks.nix");

  gitignoreSource = (import sources."gitignore.nix" { inherit (pkgs) lib; }).gitignoreSource;

  src = gitignoreSource ../.;

in
{
  inherit pkgs;

  devTools = {
    inherit (pkgs) niv bashInteractive nodejs-18_x;
    inherit (pre-commit-hooks) pre-commit;
  };

  ci = {
    pre-commit-check = pre-commit-hooks.run {
      inherit src;
      hooks = {
        shellcheck.enable = true;
        nixpkgs-fmt.enable = true;
        nix-linter.enable = true;
      };
      excludes = [ "^nix/sources\.nix$" ];
    };
  };
}
