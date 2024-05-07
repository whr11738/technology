##### 把这个目录变成 Git 可以管理的仓库

```
git init
```

##### 追踪所有文件

```
git add .
```

##### 把文件提交到仓库

```
git commit -m "内容"
```

##### 关联远程仓库

```
git remote add origin 地址
```

##### 把本地库的所有内容推送到远程库上

```
git push -u origin master
```

##### 解绑仓库

```
git remote rm origin
```

##### 查看 git 对应的远程仓库地址

```
git remote -v
```

##### 查看本地分支

```
git branch -a
```

##### 查看远程分支

```
git branch -r
```

##### 查看状态

```
git config --list
```

##### 将代码下载

```
git pull
```

##### 将代码暂存（非必须）

```
git stash
```

##### 取出代码暂存（非必须）

```
git stash pop
```

##### 将所有文件添加

```
git add
```

##### 上传到暂存区

```
git commit 'xxx'
```

##### 上传到 git

```
git push
```

##### 刷新远程分支

```
git remote update origin --prune
```

##### 强制删除本地分支

```
git branch -d 分支名
```

##### 比较两个分支的变更(如果没有变更不显示任何内容)

```
git diff 分支名 1 分支名 2
```

##### 切换到分支

```
git checkout 分支名
```
