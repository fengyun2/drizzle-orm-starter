import { db } from "./setup";
import { users } from "./schema";

const main = async () => {
	try {
		console.log("开始生成初始化数据...");
		// 删除所有数据
		await db.delete(users);

		// 开始插入数据
		await db.insert(users).values([
			{ name: "张伟", email: "zhangwei@example.com" },
			{ name: "王芳", email: "wangfang@example.com" },
			{ name: "李娜", email: "lina@example.com" },
			{ name: "刘强", email: "liuqiang@example.com" },
			{ name: "陈敏", email: "chenmin@example.com" },
			{ name: "杨静", email: "yangjing@example.com" },
			{ name: "赵婷", email: "zhaoting@example.com" },
			{ name: "吴磊", email: "wulei@example.com" },
			{ name: "周迅", email: "zhouxun@example.com" },
			{ name: "徐娇", email: "xujiao@example.com" },
		]);
    console.log("初始化数据完成！");
	} catch (err) {
		console.error(err);
    throw new Error("初始化数据失败！");
	}
};

main();
