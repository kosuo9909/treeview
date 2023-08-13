import TreeNode from './TreeNode';
import { treeData } from './storage/TreeData';

const TreeView = () => {
  const lengthOfTreeData = treeData.length;
  return (
    <div role='tree' tabIndex={0}>
      {treeData.map((node, index) => (
        <TreeNode
          key={index}
          {...node}
          parentNodesLength={lengthOfTreeData}
          posinset={index + 1}
        />
      ))}
    </div>
  );
};

export default TreeView;
