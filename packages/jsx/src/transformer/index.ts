import { ObjectDictionary, whatever } from "@opticss/util";
import {
  Options as CSSBlocksOptions,
  resolveConfiguration as resolveBlocksConfiguration,
  ResolvedConfiguration as CSSBlocksConfiguration,
  StyleMapping,
} from "css-blocks";

import { TemplateType } from "../Analyzer/Template";

export interface RewriterOptions {
  meta?: ObjectDictionary<whatever>;
  cssBlocks: {
    styleMapping: StyleMapping<TemplateType> | null;
    compilationOptions: CSSBlocksOptions;
  };
}

// TODO: The entire point of this class is to serve as a transport mechanism for
//       our StyleMapping across the Webpack/Typescript/Babel barrier. This will
//       be replaced by serializing the Mapping to JSON in the loader, appending
//       it in a comment sourcemaps style to the file, and hydrating/removing it
//       in the transformer. Remove this when that is added.
export class CSSBlocksJSXTransformer {

  styleMapping: StyleMapping<TemplateType> | null;
  cssBlockOptions: CSSBlocksConfiguration;
  blocks: ObjectDictionary<StyleMapping<TemplateType>> = {};

  constructor(opts?: RewriterOptions) {
    this.cssBlockOptions = resolveBlocksConfiguration(opts && opts.cssBlocks && opts.cssBlocks.compilationOptions);
    this.styleMapping = opts && opts.cssBlocks && opts.cssBlocks.styleMapping || null;
  }

}
