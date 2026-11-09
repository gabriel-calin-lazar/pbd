import { formatFiles, generateFiles, getProjects, names } from '@nx/devkit';
import type { Tree } from '@nx/devkit';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface AppSliceOptions {
  name: string;
  port?: number;
}

function nextPort(tree: Tree): number {
  const ports = [...getProjects(tree).values()].flatMap((project) =>
    Object.values(project.targets ?? {}).flatMap((target) => {
      const port = target.options?.['port'];
      return typeof port === 'number' ? [port] : [];
    }),
  );

  return Math.max(4200, ...ports) + 1;
}

export default async function appSliceGenerator(tree: Tree, options: AppSliceOptions) {
  const { fileName, className } = names(options.name);
  const projectRoot = `apps/${fileName}`;
  const generatorDirectory = dirname(fileURLToPath(import.meta.url));

  if (tree.exists(`${projectRoot}/project.json`)) {
    throw new Error(`An app slice named "${fileName}" already exists.`);
  }

  generateFiles(tree, join(generatorDirectory, 'files'), projectRoot, {
    ...names(options.name),
    port: options.port ?? nextPort(tree),
  });

  await formatFiles(tree);
}
