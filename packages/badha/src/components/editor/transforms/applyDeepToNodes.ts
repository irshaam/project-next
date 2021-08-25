import { NodeEntry } from "slate";

import { queryNode } from "../queries";
import { isAncestor, TDescendant, TNode, QueryNodeOptions } from "../types";

export interface ApplyDeepToNodesOptions {
  // The destination node object.
  node: TNode;
  // The source object. Can be a factory.
  source: Record<string, any> | (() => Record<string, any>);
  // Function to call on each node following the query.
  apply: (node: TNode, source: Record<string, any> | (() => Record<string, any>)) => void;
  // Query to filter the nodes.
  query?: QueryNodeOptions;
}

/**
 * Recursively apply an operation to children nodes with a query.
 */
export const applyDeepToNodes = ({ node, source, apply, query }: ApplyDeepToNodesOptions) => {
  const entry: NodeEntry<TNode> = [node, []];

  if (queryNode(entry, query)) {
    if (source instanceof Function) {
      apply(node, source());
    } else {
      apply(node, source);
    }
  }

  if (!isAncestor(node)) return;

  node.children.forEach((child: TDescendant) => {
    applyDeepToNodes({ node: child, source, apply, query });
  });
};
