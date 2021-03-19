module.exports = [
  {
    title: '基础',
    sidebarDepth: 2,
    children: [
      '',
      'basis/meet-linux',
      'basis/open-close',
      'basis/file-search',
      'basis/file-handling',
      'basis/file-view',
      'basis/dir-manage',
      'basis/compress-file',
      'basis/linux-link',
      'basis/disk-management',
      'basis/mount',
      'basis/user-log',
      'basis/user-manage',
      'basis/view-help',
    ],
  },
  {
    title: 'Common',
    sidebarDepth: 2,
    children: ['common/', 'common/ssh', 'common/curl', 'common/grep', 'common/netstat'],
  },
  {
    title: '进阶',
    sidebarDepth: 2,
    children: ['advanced/xargs', 'advanced/awk', 'advanced/sed', 'advanced/symbol'],
  },
  {
    title: 'Shell',
    sidebarDepth: 2,
    children: ['shell/meet-shell', 'shell/demo'],
  },
  {
    title: 'Ubuntu',
    sidebarDepth: 2,
    children: ['ubuntu/install', 'ubuntu/dev-0', 'ubuntu/dev-1'],
  },
]
