import TreeNode from './TreeNode';
import { treeData } from './storage/TreeData';

const TreeView = () => {
  return (
    <div role='tree'>
      {treeData.map((node, index) => (
        <TreeNode key={index} {...node} />
      ))}
    </div>
  );
};

export default TreeView;
