import TreeNode from './TreeNode';
import { treeData } from './storage/TreeData';

const TreeView = () => {
  const lengthOfTreeData = treeData.length;
  return (
    <div role="tree" tabIndex={0} aria-label="A tree consisting of basic nodes">
      {treeData.map((node, index) => (
        <TreeNode
          key={index}
          {...node}
          parentNodesLength={lengthOfTreeData}
          posinset={index}
        />
      ))}
    </div>
  );
};

export default TreeView;
