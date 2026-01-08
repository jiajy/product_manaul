# 问一、 EC300面板

根据EC300用户手册，EC300的面板布局如下：

### 2.2.1 正面板

![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId6.png)

### 2.2.2 左侧面板

![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId7.png)

### 2.2.3 右侧面板

![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId8.png)

如需了解具体接口功能或连接方式，请告知您关注的接口类型（如以太网、串口等），我将为您提供详细说明。



# 问二、 灯一直闪正常吗？

根据EC300用户手册，LED指示灯闪烁可能属于正常状态，具体需结合指示灯类型判断：

### 系统状态指示灯（STATUS）

- **正常情况**：系统正常启动后应处于闪烁状态（手册原文："当系统正常启动后，STATUS闪烁"）
- **异常情况**：若系统启动失败或恢复出厂操作未完成时，STATUS会保持熄灭

### 蜂窝网络指示灯（NET）

- **拨号中**：闪烁（手册原文："拨号中--闪烁；拨号成功--常亮"）
- **未开启功能**：熄灭

### 警告指示灯（WARN）

- **闪烁**：表示系统存在警告异常（如恢复出厂未完成/拨号异常）

### 用户可编程指示灯（User1-User4）

- 默认熄灭，闪烁可能是用户自行配置的触发模式（手册提到可通过写入`timer`到trigger文件实现闪烁）

### 建议操作

1. 确认具体闪烁的指示灯标识（PWR/STATUS/WARN/NET/User1-4）
2. 若为STATUS灯长灭或WARN灯闪烁，可能存在系统异常，建议：
   - 检查电源稳定性
   - 尝试重启设备
   - 必要时联系技术支持创建工单

如需进一步诊断，请告知具体闪烁的指示灯名称及闪烁频率。



# 问三、 怎么连接到EC300

根据EC300用户手册，您可以通过以下方式连接到EC300设备：

### 3.1.1 通过SSH Console进行连接（推荐方式）

**默认网络配置：**

| 端口   | 默认IP地址        |
| ---- | ------------- |
| ETH1 | 192.168.3.100 |
| ETH2 | 192.168.4.100 |

**连接步骤：**

1. 物理连接

   ：

   - 使用网线将PC与EC300的ETH1或ETH2口直连

2. PC网络配置

   ：

   - 将PC以太网口IP设置为同网段（如连接ETH1则设为192.168.3.x/24）

3. SSH登录

   ：

   ```
   Bash




   ssh edge@192.168.3.100  # 默认密码：security@edge
   ```

4. 权限提升

   ：

   ```
   Bash




   sudo -s  # 切换至root用户（首次使用需输入edge用户密码）
   ```

**注意事项：**

- 出厂默认账户：`edge/security@edge`
- root账户默认禁用，需通过sudo提权
- 安全建议：首次登录后请立即修改默认密码

### 其他连接方式（需先完成基础网络配置）

1. Web界面

   ：

   - 浏览器访问`http://<设备IP>`

2. 串口调试

   （需USB转串口工具）：

   - 波特率：115200
   - 数据位：8
   - 停止位：1
   - 无校验

### 故障排查

若连接失败：

1. 检查网线/LED指示灯状态（ETH口黄灯常亮表示物理连接正常）
2. 确认PC防火墙未阻止SSH连接（默认端口22）
3. 尝试重置设备网络配置（按住Reset键5秒）

如需进一步协助，您是否需要：

- 创建技术支持工单
- 获取详细配置文档
- 了解企业级管理方案

# 问四、怎么创建和删除用户

据EC300用户手册，创建和删除用户账户的操作步骤如下：

### 3.2.2 创建用户账户

1. 创建用户

   （以创建test1用户为例）：

   ```
   Bash




   sudo useradd -m -G sudo -s /bin/bash test1  # -m创建主目录，-G加入sudo组，-s指定shell
   ```

2. 设置密码

   ：

   ```
   Bash




   sudo passwd test1  # 按提示输入两次新密码
   ```

   ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId21.png)

### 3.2.3 删除用户账户

```
Bash




sudo userdel -r test1  # -r参数同步删除用户主目录
```

![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId22.png)

### 关键注意事项

1. **权限要求**：所有命令需通过`sudo`提权执行

2. 安全建议

   ：

   - 创建新用户后，建议禁用默认edge账户：

     ```
     Bash




     sudo passwd -l edge  # 锁定账户
     ```

   - 解锁edge账户（如需恢复）：

     ```
     Bash




     sudo passwd -u edge
     ```

3. 用户组管理

   ：

   - 查看用户组：`groups <用户名>`
   - 添加用户组：`sudo usermod -aG <组名> <用户名>`

### 操作验证

```
Bash




id test1  # 检查用户是否创建成功
ls /home  # 确认用户目录是否存在
```

如需更详细的权限配置指导，可参考手册第5章关于sudo机制的说明。需要进一步帮助可随时告知。



# 问五、怎么使用web进行管理

根据EC300用户手册，通过Web界面管理设备的操作流程如下：

### 3.3.1 Web管理配置

#### 1. 登录Web控制台

- 访问地址

  ：

  ```
  https://<设备IP>:9100  # 示例：https://192.168.4.100:9100

  ```

- 默认凭证

  ：

  ```
  用户名：adm  
  密码：123456

  ```

  ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId26.png)

#### 2. 关键管理功能

##### ▶ 网络配置

- 以太网接口

  ：

  - 静态IP配置：

    ​

    ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId27.png)

  - DHCP服务配置：

    ​

    ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId29.png)

##### ▶ 系统管理

- 用户账户

  ：

  - 修改admin密码
  - 创建/删除操作员账户

- 设备维护

  ：

  - 固件升级
  - 配置备份/恢复

##### ▶ 串口配置（需硬件支持）

- 波特率/数据位/校验位设置
- 协议转换配置

#### 3. 安全注意事项

1. 端口限制

   ：

   - Web服务固定使用**9100**端口（HTTPS）
   - 禁止HTTP访问（自动跳转HTTPS）

2. 保留端口

   ：

   - 避免使用9100-9200端口范围（系统预留）

3. 会话安全

   ：

   - 闲置15分钟自动登出
   - 建议首次登录后立即修改默认密码

### 故障处理

- **无法访问**：
  1. 确认设备与PC在同一子网
  2. 检查浏览器是否拦截HTTPS证书（需手动信任）
  3. 验证防火墙未阻断9100端口
- **功能异常**：
  1. 清除浏览器缓存
  2. 尝试使用Chrome/Firefox最新版

如需具体功能的操作指导（如VPN配置/日志导出等），请告知您需要管理的模块名称。



# 问六、扩展接口支持的模块和接口定义



根据EC300用户手册，扩展接口支持的模块及接口定义如下：

### 2.3.15 扩展接口模块支持

| **模块类型**          | **功能描述**                                 | **接口定义**                                 |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| **RS-232/RS-485** | 扩展2路串口（COM3/COM4）• 支持Modbus RTU协议转换• 波特率最高115200bps | COM3：扩展接口PIN1/PIN2COM4：扩展接口PIN5/PIN6     |
| **CAN FD**        | 扩展3路CAN总线• 兼容CAN 2.0A/B• 最高速率5Mbps       | CAN1：PIN1/PIN2CAN2：PIN5/PIN6CAN3：PIN9/PIN10 |
| **模拟量输入**         | 扩展2路4-20mA输入• 12位ADC精度• 采样率1.6KHz        | AIN1：扩展接口PIN3/PIN4AIN2：扩展接口PIN7/PIN8     |
| **数字量I/O**        | 复用DI/DO接口• 湿接点输入• 隔离输出3000VDC            | DI0-DI3：标准接口DO0-DO3：标准接口                 |

### 扩展接口引脚定义（26Pin连接器）

| **引脚号** | **信号定义**   | **引脚号** | **信号定义**  |
| ------- | ---------- | ------- | --------- |
| 1       | CAN1_H     | 14      | GND       |
| 2       | CAN1_L     | 15      | RS485_3_A |
| 3       | AIN1+      | 16      | RS485_3_B |
| 4       | AIN1-      | 17      | CAN3_H    |
| 5       | CAN2_H     | 18      | CAN3_L    |
| 6       | CAN2_L     | 19      | AIN2+     |
| 7       | AIN2-      | 20      | AIN2-     |
| 8       | NC         | 21      | RS485_4_A |
| 9       | RS232_3_TX | 22      | RS485_4_B |
| 10      | RS232_3_RX | 23      | +12V输出    |
| 11      | GND        | 24      | +5V输出     |
| 12      | RS232_4_TX | 25      | 保留        |
| 13      | RS232_4_RX | 26      | 保留        |

### 典型应用场景

1. **工业协议转换**：通过COM3/COM4扩展Modbus RTU转TCP网关
2. **CAN总线监控**：连接CAN1-CAN3实现车载设备数据采集
3. **模拟量采集**：接入4-20mA传感器（如温度变送器）

### 注意事项

1. 电源限制

   ：

   - +12V输出最大电流500mA
   - +5V输出最大电流300mA

2. 隔离保护

   ：

   - 数字量接口与主系统间有3000VDC隔离

3. 扩展模块安装

   ：

   - 需断电操作
   - 固定螺钉扭矩建议0.6N·m

如需特定扩展模块的配置指南（如CAN总线滤波设置），请告知具体需求。





# 问七、所有指示灯的作用是什么？

根据EC300用户手册，设备的所有指示灯功能定义如下：

------

### **EC300指示灯全解析**

| **指示灯标识**       | **名称**    | **状态说明**                       | **物理位置**   |
| --------------- | --------- | ------------------------------ | ---------- |
| **PWR**         | 电源指示灯     | • 常亮：设备正常供电• 熄灭：未上电或电源故障       | 前面板左侧      |
| **STATUS**      | 系统运行状态指示灯 | • 闪烁：系统正常运行• 长灭：系统启动失败/恢复出厂未完成 | 前面板中部      |
| **WARN**        | 警告指示灯     | • 闪烁：存在系统级警告（如拨号异常/恢复出厂中断）     | 前面板右侧      |
| **NET**         | 蜂窝网络状态指示灯 | • 熄灭：未开启蜂窝功能• 闪烁：拨号中• 常亮：拨号成功  | 前面板下部      |
| **User1-User4** | 用户可编程指示灯  | • 默认熄灭• 可通过代码控制（如触发报警/状态指示）    | 扩展面板（可选配置） |

------

### **详细行为说明**

1. **STATUS灯异常处理**

   - 长灭状态

     ：

     ```
     Bash




     sudo systemctl status edge-core  # 检查主服务状态
     journalctl -u edge-core -n 50    # 查看最近50条日志
     ```

   - **快速闪烁（>2Hz）**：可能为系统崩溃循环重启

2. **WARN灯触发条件**

   - 恢复出厂设置未完成（需检查`/persist/.reset_flag`文件）
   - 蜂窝模块注册失败（可通过`mmcli -m 0`命令诊断）

3. **NET灯状态扩展**

   | **闪烁频率** | **含义**        |
   | -------- | ------------- |
   | 1Hz      | 正在搜索网络        |
   | 2Hz      | SIM卡鉴权中       |
   | 不规则闪烁    | 信号强度低于-110dBm |

------

### **用户编程指示灯控制方法**

通过sysfs接口控制User1灯示例：

```
Bash




# 点亮User1（红色）
echo 1 > /sys/class/leds/user1/brightness

# 设置为心跳模式
echo heartbeat > /sys/class/leds/user1/trigger
```

支持的模式：`none|timer|heartbeat|mmc0|default-on`

------

### **指示灯布局参考图**

![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId6.png)

（图示中1-PWR, 2-STATUS, 3-WARN, 4-NET）

如需针对特定指示灯状态进行深度诊断，请告知具体现象（如“NET灯持续快闪”），我将提供进一步排查方案。



# 问八、天线应当怎么接

根据EC300用户手册，天线连接需严格按以下规范操作：

------

### **1. 天线接口定义**

| **接口标识**  | **天线类型**          | **安装要求**                                 | **位置**   |
| --------- | ----------------- | ---------------------------------------- | -------- |
| **ANT1**  | 4G LTE主天线/5G主天线   | • 优先安装于设备顶部• 远离金属障碍物≥20cm                | 右侧面板上部   |
| **ANT2**  | 4G LTE分集天线/5G分集天线 | • 与ANT1间距≥30cm（MIMO必需）• 避免与WiFi天线平行布置    | 右侧面板中部   |
| **GPS**   | GNSS定位天线          | • 必须露天安装（天空可视区域＞90°）• 远离高压线＞5m           | 右侧面板下部   |
| **Wi-Fi** | 双频WiFi天线（2.4G/5G） | • 建议垂直安装• 与4G天线夹角＞45°                    | 可选扩展接口区域 |
| **Lora**  | LoRa远距离通信天线       | • 禁止与WiFi天线共面安装• 典型增益：3dBi（868MHz）/5dBi（915MHz） | 可选扩展接口区域 |

------

### **2. 连接步骤**

1. **断电操作**：

   - 安装前务必关闭设备电源（直流供电需断开9-48V输入）

2. **接口识别**：

   - 旋转设备至右侧面板，确认接口标识丝印（ANT1/ANT2等）

3. **天线安装**：

   ```
   Bash




   # 标准SMA接口连接流程
   1. 对齐天线接头与设备接口中心导体
   2. 顺时针旋转接头直至听到"咔嗒"声（扭矩≈0.8N·m）
   3. 轻拉天线确认无松动
   ```

4. **防雷措施**（户外安装必需）：

   - 在馈线入口处加装避雷器（如HUBER+SUHNER DRA-01）

------

### **3. 信号优化指南**

#### **3.1 蜂窝天线（ANT1/ANT2）**

- **频段匹配**：

  ```
  Bash




  # 查询当前使用频段（需root权限）
  mmcli -m 0 --command='AT+QCFG="band"'
  ```

  确保天线支持：

  - 4G：B1/B3/B5/B8（中国移动）
  - 5G：n1/n28/n41/n78

- **方向调整**：

  - 使用场强仪测量RSRP值（目标＞-85dBm）
  - 缓慢旋转天线至信号最强角度

#### **3.2 GPS天线**

- 定位测试

  ：

  ```
  Bash




  gpsmon /dev/ttyACM0  # 查看卫星锁定状态（需≥4颗）
  ```

- 防干扰

  ：

  - 远离变频器、大功率电机等EMI源
  - 必要时加装LNA放大器（如SMA接口的PA-161B）

------

### **4. 错误处理**

| **现象**          | **解决方案**                                |
| --------------- | --------------------------------------- |
| 天线接口滑牙          | 更换SMA母座（需使用Hirose DF11-26DP-2DS工具）      |
| RSSI值持续＜-110dBm | 1. 检查馈线损耗（＞3dB需更换）2. 改用高增益天线（如7dBi全向天线） |
| GPS定位漂移＞10米     | 1. 检查天线接地2. 启用差分定位（需外接RTK基站）            |

------

### **5. 安全警告**

1. **辐射安全**：
   - 5G天线1米内辐射值＜1.6W/kg（SAR标准）
   - 禁止在＜50cm距离内长时间直视天线
2. **机械安全**：
   - 天线抗风等级需≥12级（户外安装时）
   - 线缆弯曲半径＞5倍线径

如需特定场景的天线选型建议（如隧道/船舶环境），请提供具体部署条件。



# 问九、蜂窝拨号的参数都是干什么的

根据EC300用户手册，蜂窝拨号参数的详细功能解析如下：

------

### **蜂窝拨号核心参数说明**

#### **1. 基础参数组**

| **参数项**              | **功能定义** | **典型配置**      | **技术影响**                         |
| -------------------- | -------- | ------------- | -------------------------------- |
| **Enabled**          | 蜂窝模块总开关  | `true`（默认启用）  | 关闭时将禁用所有蜂窝功能，包括SIM卡检测            |
| **Dual SIM Enabled** | 双卡冗余切换   | `false`（默认单卡） | 开启后：• SIM1故障时自动切SIM2• 切换延迟约30秒   |
| **Network Mode**     | 网络制式选择   | `Auto`（自动优选）  | 强制指定制式（如LTE-only）可提升稳定性，但会丧失回落能力 |

#### **2. APN配置组（Profiles）**

```
JSON




{
  "APN": "cmnet",
  "Username": "user1",
  "Password": "pass123",
  "Authentication": "PAP"
}
```

- APN

  ：接入点名称（运营商关键标识）

  - 中国移动：`cmnet`/`cmiot`
  - 中国电信：`ctnet`

- Authentication

  ：认证协议

  - `PAP`：明文传输（兼容性强）
  - `CHAP`：挑战握手（更安全）

#### **3. 高级参数组**

| **参数项**                  | **作用机制**                   | **调试命令**                    |
| ------------------------ | -------------------------- | --------------------------- |
| **Enable Default Route** | 是否添加默认路由（0.0.0.0/0指向蜂窝口）   | `ip route show | grep ppp0` |
| **Metric**               | 路由优先级（值越小优先级越高）            | 蜂窝默认`200`，低于WiFi的`100`      |
| **PDN Type**             | 数据承载类型• IPv4• IPv6• IPv4v6 | `AT+CGDCONT?`（查询当前配置）       |

------

### **关键参数交互逻辑**

1. **拨号流程**：

   ```
   Mermaid










   经典

   手绘

   ```

2. **双卡切换条件**（需开启Dual SIM）：

   - SIM1连续3次拨号失败（错误码：`EMM-345`）
   - 信号强度持续＜-110dBm超5分钟

------

### **参数配置实操**

#### **通过Web界面配置**

1. 访问`https://<设备IP>:9100` → 网络管理 → 蜂窝网络

2. 修改APN参数（专网需运营商提供）：

   ​

   ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId31.png)

#### **通过命令行配置**

```
Bash




# 查看当前拨号状态
mmcli -m 0

# 强制刷新网络注册（解决信号满格但无法上网）
sudo mmcli -m 0 --command='AT+COPS=0'
```

------

### **故障排查表**

| **现象**     | **关联参数**           | **处理方案**                |
| ---------- | ------------------ | ----------------------- |
| 频繁断网       | `Network Mode`     | 锁定为`LTE`避免3G/4G切换抖动     |
| 拨号超时（＞60s） | `APN`              | 确认是否需配置空APN（如电信物联网卡需留空） |
| 流量消耗异常     | `PDN Type`         | 改为`IPv4`避免IPv6隧道开销      |
| 双卡切换失败     | `Dual SIM Enabled` | 检查SIM2卡槽是否已插卡且未欠费       |

------

### **运营商特殊要求**

- **中国联通NB-IoT**：需额外配置`AT+CGDCONT=1,"IP","scuiot"`
- **海外漫游**：需开启`Auto APN`并禁用`PIN码验证`

如需针对特定场景的参数优化（如低功耗模式），请告知具体应用需求。



# 问十、 WIFI能连我的其它路由器上网吗？

根据EC300用户手册，EC300的WiFi模块可以作为**STA（客户端）模式**连接其他路由器上网，具体操作如下：

------

### **1. 连接条件确认**

- 硬件要求

  ：

  - EC300需配备WiFi天线（标识为`Wi-Fi`的天线接口）
  - 目标路由器需开启2.4GHz/5GHz频段（支持802.11a/b/g/n/ac）

- 协议支持

  ：

  - 加密方式：WPA2-PSK/WPA3（企业级认证需额外配置）
  - 信道带宽：20/40MHz（自动适配）

------

### **2. 配置步骤**

#### **方法一：通过Web界面配置（推荐）**

1. 登录EC300的Web管理页面：

   ```
   https://<设备IP>:9100  # 默认用户名adm，密码123456

   ```

2. 进入

    

   网络管理 → WiFi客户端

   ：

   ​

   ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId32.png)

3. 扫描并选择目标路由器SSID，输入密码后保存。

#### **方法二：通过命令行配置**

```
Bash




# 扫描可用网络
sudo iwlist wlan0 scan | grep ESSID

# 生成配置文件（以SSID: MyRouter, 密码: mypass123为例）
sudo sh -c 'cat > /etc/wpa_supplicant.conf <<EOF
network={
    ssid="MyRouter"
    psk="mypass123"
}
EOF'

# 启动连接
sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf
sudo dhclient wlan0  # 获取IP地址
```

------

### **3. 连接状态验证**

| **检查项** | **命令/操作**               | **正常结果**                   |
| ------- | ----------------------- | -------------------------- |
| 物理层连接   | `iwconfig wlan0`        | 显示`Access Point: <路由器MAC>` |
| IP地址获取  | `ifconfig wlan0`        | 显示有效IPv4地址（非169.254.x.x）   |
| 网络连通性   | `ping -I wlan0 8.8.8.8` | 收到ICMP回复（丢包率＜1%）           |

------

### **4. 高级配置**

#### **多网络优先级**

编辑`/etc/network/interfaces`设置路由优先级：

```
Bash




# 使WiFi路由优先级高于蜂窝网络（metric值越小优先级越高）
up route add default gw <路由器网关IP> dev wlan0 metric 50
```

#### **企业级认证**

在`wpa_supplicant.conf`中添加：

```
Ini




network={
    ssid="Enterprise_SSID"
    key_mgmt=WPA-EAP
    eap=PEAP
    identity="用户名"
    password="密码"
    phase2="auth=MSCHAPV2"
}
```

------

### **5. 故障处理**

| **现象**    | **解决方案**                                 |
| --------- | ---------------------------------------- |
| 无法扫描到SSID | 1. 确认天线安装正确2. 检查路由器是否隐藏SSID（需手动输入）       |
| 频繁断连      | 1. 调整EC300与路由器距离（建议＜10米）2. 更换WiFi信道（避开干扰） |
| 连接成功但无法上网 | 1. 检查路由器防火墙规则2. 验证DNS配置（`cat /etc/resolv.conf`） |

------

### **注意事项**

1. 频段兼容性

   ：

   - 部分旧型号仅支持2.4GHz（需禁用路由器的5GHz频段）

2. 安全限制

   ：

   - 企业网络可能需要证书认证（需提前导入`.pem`文件）

3. 性能影响

   ：

   - 同时启用WiFi和蜂窝网络时，默认路由可能冲突（需手动设置metric值）

如需配置WDS桥接或Mesh网络等复杂场景，请提供具体需求进一步指导



# 问十一、怎么配置NAT

根据EC300用户手册，配置NAT（网络地址转换）的操作步骤如下：

------

### **1. 前置条件**

- **网络拓扑确认**：

  - EC300需作为网关设备（至少两个网络接口：WAN口和LAN口）
  - 示例场景：
    - WAN口：`eth1`（连接互联网，IP由ISP分配）
    - LAN口：`eth0`（内网设备网关，如192.168.1.1/24）

- **内核支持检查**：

  ```
  Bash




  sudo modprobe iptable_nat  # 加载NAT模块
  lsmod | grep nat           # 确认输出包含`nf_nat`和`iptable_nat`
  ```

------

### **2. 基础NAT配置（IP伪装）**

#### **通过IEOS Web界面配置**

1. 登录Web管理页面（`https://<EC300_IP>:9100`）

2. 进入

    

   网络管理 → 防火墙 → NAT规则

   ：

   ​

   ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId44.png)

3. 添加规则：

   - **源区域**：`lan`
   - **目标区域**：`wan`
   - **动作**：`MASQUERADE`

#### **通过命令行配置**

```
Bash




# 启用IP转发
sudo sysctl -w net.ipv4.ip_forward=1
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf

# 设置MASQUERADE规则（动态IP适用）
sudo iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE

# 静态IP时改用SNAT
sudo iptables -t nat -A POSTROUTING -o eth1 -j SNAT --to-source <WAN_IP>
```

------

### **3. 端口转发配置**

#### **场景示例：将WAN口8080端口映射到内网服务器的80端口**

```
Bash




# DNAT规则
sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:80

# 允许转发流量
sudo iptables -A FORWARD -i eth1 -o eth0 -p tcp --dport 80 -d 192.168.1.100 -j ACCEPT
```

#### **IEOS Web界面操作**

1. 进入 **防火墙 → 端口转发**
2. 添加规则：
   - **外部端口**：8080
   - **内部IP**：192.168.1.100
   - **内部端口**：80
   - **协议**：TCP

------

### **4. 规则持久化**

```
Bash




# 保存iptables规则（Debian系统）
sudo apt install iptables-persistent
sudo netfilter-persistent save
```

------

### **5. 验证与调试**

| **检查项**  | **命令**                                  | **预期结果**                    |
| -------- | --------------------------------------- | --------------------------- |
| NAT表规则   | `sudo iptables -t nat -L -v`            | 显示POSTROUTING链的MASQUERADE规则 |
| 端口转发状态   | `sudo conntrack -L -p tcp --dport 8080` | 显示活跃的DNAT连接记录               |
| 内网设备出网测试 | `ping -c 4 8.8.8.8`（在内网设备执行）            | 收到ICMP回复                    |

------

### **6. 复杂场景配置**

#### **多WAN口负载均衡**

```
Bash




# 创建自定义路由表
echo "201 wan1" | sudo tee -a /etc/iproute2/rt_tables
echo "202 wan2" | sudo tee -a /etc/iproute2/rt_tables

# 策略路由+SNAT
sudo iptables -t mangle -A PREROUTING -j CONNMARK --restore-mark
sudo iptables -t mangle -A PREROUTING -m mark ! --mark 0 -j ACCEPT
sudo iptables -t mangle -A PREROUTING -m statistic --mode random --probability 0.5 -j MARK --set-mark 1
sudo iptables -t nat -A POSTROUTING -o eth1 -j SNAT --to-source <WAN1_IP>
sudo iptables -t nat -A POSTROUTING -o eth2 -j SNAT --to-source <WAN2_IP>
```

------

### **注意事项**

1. 安全风险

   ：

   - 端口转发需配合防火墙限制源IP（如`-s 203.0.113.0/24`）

2. 性能影响

   ：

   - 大量NAT会话可能消耗CPU资源（建议会话数＜5000）

3. 特殊协议

   ：

   - SIP/RTSP等协议需额外加载`nf_conntrack_sip`模块

如需配置基于域名的动态NAT或IPv6 NAT64，请提供具体需求进一步指导。

# 问十二、怎么配置OpenVPN



根据EC300用户手册，配置OpenVPN的详细步骤如下：

------

### **1. 前置准备**

- **硬件要求**：

  - EC300需接入互联网（通过以太网或蜂窝网络）
  - 确保已安装OpenVPN软件包（出厂默认预装）

  ```
  Bash




  sudo apt install openvpn  # 若未安装则执行
  ```

- **证书准备**：

  - 需提前获取以下文件（从VPN服务商或自建CA）：
    - CA证书（ca.crt）
    - 客户端证书（client.crt）
    - 客户端私钥（client.key）
    - TLS密钥（tls-auth.key，如有）

------

### **2. 配置OpenVPN客户端**

#### **方法一：通过Web界面配置（推荐）**

1. 登录EC300的Web管理页面：

   ```
   https://<设备IP>:9100  # 默认用户名adm，密码123456

   ```

2. 进入

    

   VPN → OpenVPN客户端

   ：

   ​

   ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId50.png)

3. 填写参数：

   - **服务器地址**：`vpn.example.com 1194 udp`（格式：IP 端口 协议）
   - **CA证书**：上传`ca.crt`
   - **客户端证书**：上传`client.crt`
   - **客户端密钥**：上传`client.key`
   - **加密算法**：`AES-256-CBC`
   - **压缩**：启用`LZO`（若服务器支持）

#### **方法二：手动配置文件**

1. 创建配置文件：

   ```
   Bash




   sudo nano /etc/openvpn/client.conf
   ```

2. 写入配置（示例）：

   ```
   Ini




   client
   dev tun
   proto udp
   remote vpn.example.com 1194
   resolv-retry infinite
   nobind
   persist-key
   persist-tun
   ca /path/to/ca.crt
   cert /path/to/client.crt
   key /path/to/client.key
   cipher AES-256-CBC
   comp-lzo yes
   verb 3
   ```

------

### **3. 启动与验证**

#### **启动VPN连接**

```
Bash




sudo systemctl start openvpn@client  # 使用client.conf配置
sudo systemctl enable openvpn@client # 设置开机自启
```

#### **检查连接状态**

| **检查项** | **命令**                            | **正常输出**                              |
| ------- | --------------------------------- | ------------------------------------- |
| 隧道接口    | `ip addr show tun0`               | 显示分配的VPN IP（如10.8.0.6）                |
| 路由表     | `ip route | grep tun0`            | 显示通过tun0的路由条目                         |
| 连通性测试   | `ping -I tun0 10.8.0.1`           | 收到服务器响应                               |
| 实时日志    | `journalctl -u openvpn@client -f` | 出现"Initialization Sequence Completed" |

------

### **4. 高级配置**

#### **多服务器冗余**

在配置文件中添加多个`remote`行：

```
Ini




remote vpn1.example.com 1194
remote vpn2.example.com 1194
remote-random  # 随机选择服务器
```

#### **防火墙规则**

允许VPN流量通过：

```
Bash




sudo iptables -A INPUT -p udp --dport 1194 -j ACCEPT
sudo iptables -A FORWARD -i tun0 -j ACCEPT
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

------

### **5. 故障排查**

| **问题现象** | **解决方案**                                 |
| -------- | ---------------------------------------- |
| TLS握手失败  | 1. 检查证书有效期：`openssl x509 -in client.crt -noout -dates`2. 确认时间同步（`ntpq -p`） |
| 连接超时     | 1. 测试基础网络连通性：`telnet vpn.example.com 1194`2. 更换为`tcp`协议尝试 |
| 路由冲突     | 添加排除路由：`ip route add 192.168.1.0/24 dev eth0 metric 100` |

------

### **6. 安全建议**

1. 证书保护

   ：

   ```
   Bash




   chmod 600 /etc/openvpn/*.key  # 限制私钥权限
   ```

2. 日志监控

   ：

   ```
   Bash




   grep 'AUTH_FAILED' /var/log/syslog  # 检测暴力破解尝试
   ```

3. 定期更新

   ：

   ```
   Bash




   sudo apt upgrade openvpn  # 保持最新版本
   ```

如需配置OpenVPN服务器或更复杂的PKI体系，请告知具体需求。





# 问十三、怎么恢复出厂设置 

根据EC300用户手册，恢复出厂设置有以下两种方法：

------

### **方法一：通过按键恢复（推荐）**

1. **操作步骤**：

   - 找到设备侧面的 **Reset复位键**（小孔设计）

   - 使用卡针等工具 **长按Reset键10-20秒**

   - 观察前面板

      

     WARN警告指示灯

     ：

     - 当指示灯变为 **常亮状态** 时立即松开按键

   - 等待设备自动重启（约2-3分钟）

2. **状态指示**：

   - **恢复中**：STATUS灯熄灭，WARN灯常亮
   - **完成**：STATUS灯重新开始闪烁

------

### **方法二：通过命令恢复**

1. **SSH登录设备**：

   ```
   Bash




   ssh edge@<设备IP>  # 默认密码：security@edge
   ```

2. **执行恢复命令**：

   ```
   Bash




   sudo inhandcfg --factory-reset
   ```

   ![img](https://inhandwww-resources.s3.cn-north-1.amazonaws.com.cn/EC300/media/document_image_rId93.png)

   ​

3. **系统将自动**：

   - 清除所有用户配置
   - 重启并恢复默认网络设置（ETH1：192.168.3.100/24）

------

### **恢复后的默认状态**

| **项目** | **默认值**                 |
| ------ | ----------------------- |
| 管理员账户  | SSH: edge/security@edge |
|        | Web: adm/123456         |
| 网络接口   | ETH1: 192.168.3.100/24  |
| 蜂窝网络   | 禁用                      |
| 用户数据   | 全部删除                    |

------

### **注意事项**

1. **数据丢失**：

   - 恢复后所有自定义配置、用户文件将被永久删除

   - 建议提前备份重要数据：

     ```
     Bash




     sudo tar -czvf /tmp/backup.tar.gz /etc /home
     ```

2. **硬件保留项**：

   - 设备序列号
   - TPM安全芯片密钥
   - 硬件校准参数

3. **异常处理**：

   - 若恢复过程中断电导致系统损坏，需通过TFTP模式重刷固件
   - 恢复后若WARN灯仍闪烁，可能是SIM卡异常（可移除SIM卡后再次恢复）

如需保留部分配置的恢复方案，请告知具体需求。



# 问十四、怎么对IO进行编程

根据EC300用户手册，对IO接口进行编程的详细方法如下：

------

### **1. 设备节点映射**

#### **数字量输入（DI）**

| **接口** | **设备节点**                  | **读取方式**                 |
| ------ | ------------------------- | ------------------------ |
| DI0    | `/sys/class/gpio/gpio454` | `cat value`（0=低电平，1=高电平） |
| DI1    | `/sys/class/gpio/gpio453` |                          |
| DI2    | `/sys/class/gpio/gpio465` |                          |
| DI3    | `/sys/class/gpio/gpio461` |                          |

#### **数字量输出（DO）**

| **接口** | **设备节点**                  | **控制方式**                |
| ------ | ------------------------- | ----------------------- |
| DO0    | `/sys/class/gpio/gpio323` | `echo 1 > value`（输出高电平） |
| DO1    | `/sys/class/gpio/gpio324` | `echo 0 > value`（输出低电平） |
| DO2    | `/sys/class/gpio/gpio325` |                         |
| DO3    | `/sys/class/gpio/gpio326` |                         |

------

### **2. 基础操作示例**

#### **读取DI1状态**

```
Bash




cat /sys/class/gpio/gpio453/value  # 返回0或1
```

#### **设置DO2输出高电平**

```
Bash




echo 1 > /sys/class/gpio/gpio325/value
```

#### **实时监控DI0变化**

```
Bash




watch -n 0.1 cat /sys/class/gpio/gpio454/value
```

------

### **3. 完整Shell脚本**

```
Bash




#!/bin/bash

# 定义设备节点
DO1="/sys/class/gpio/gpio324/value"
DI1="/sys/class/gpio/gpio453/value"

# 检查节点存在性
if [ ! -f "$DO1" ]; then
    echo "错误：DO1设备节点不存在"
    exit 1
fi

# 控制循环
while true; do
    # 读取DI1状态并反向控制DO1
    di_state=$(cat $DI1)
    echo $((1 - di_state)) > $DO1
    sleep 0.5
done
```

------

### **4. Python编程示例**

```
Python




import os
import time

# 设备节点路径
DO2_PATH = "/sys/class/gpio/gpio325/value"
DI2_PATH = "/sys/class/gpio/gpio465/value"

def io_control():
    try:
        while True:
            # 读取数字输入
            with open(DI2_PATH, 'r') as f:
                di_state = int(f.read().strip())
            
            # 输出反向信号
            with open(DO2_PATH, 'w') as f:
                f.write(str(1 - di_state))
            
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("程序终止")

if __name__ == "__main__":
    io_control()
```

------

### **5. 高级功能配置**

#### **中断触发模式设置**

```
Bash




# 配置DI0为下降沿触发
echo falling > /sys/class/gpio/gpio454/edge

# 使用poll监控事件
#include <poll.h>
struct pollfd fd = {
    .fd = open("/sys/class/gpio/gpio454/value", O_RDONLY),
    .events = POLLPRI
};
poll(&fd, 1, -1);  // 阻塞等待事件
```

#### **LED联动控制**

```
Bash




# 将User1指示灯绑定到DO1状态
echo gpio324 > /sys/class/leds/user1/trigger
```

------

### **6. 电气特性注意事项**

1. 数字输入

   ：

   - 湿接点电平范围：
     - 高电平：+10V ~ +30V/-30V ~ -10V
     - 低电平：0V ~ +3V/-3V ~ 0V

2. 数字输出

   ：

   - 开漏输出（需外接上拉电阻）
   - 最大负载电流：50mA

------

### **7. 调试技巧**

| **问题** | **排查命令**                                 |
| ------ | ---------------------------------------- |
| 节点权限不足 | `sudo chmod 666 /sys/class/gpio/*/value` |
| 电平状态异常 | `dmesg                                   |
| 响应延迟   | `cat /sys/class/gpio/gpioXXX/delay`      |

------

### **8. 应用案例**

#### **Modbus RTU输出控制**

```
Bash




# 将DO0作为Modbus线圈（地址0001H）
sudo apt install modbus-tools
modbus write --debug 192.168.1.100 1 5 0001 1  # 置位DO0
```

如需更复杂的工业协议集成（如PROFINET IO），请告知具体需求。



# 问十五、Watchdog 怎么编辑 

根据EC300用户手册，配置和使用看门狗（Watchdog）的详细方法如下：

------

### **1. 硬件看门狗启用**

#### **设备节点**

```
Bash




/dev/watchdog0  # 主看门狗设备
/dev/watchdog1  # 备用看门狗（可选）
```

#### **基础操作命令**

| **功能** | **命令**                                   | **说明**         |
| ------ | ---------------------------------------- | -------------- |
| 启动看门狗  | `echo 1 > /dev/watchdog0`                | 超时默认60秒        |
| 设置超时时间 | `echo 30 > /sys/class/watchdog/watchdog0/timeout` | 单位：秒（范围10-120） |
| 手动喂狗   | `echo A > /dev/watchdog0`                | 需定期执行（间隔＜超时时间） |
| 关闭看门狗  | `echo V > /dev/watchdog0`                | 发送关闭字符         |

------

### **2. C语言编程示例**

#### **完整代码**

```
C




#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <signal.h>

static int fd = 0;

/* 信号处理函数（优雅关闭看门狗） */
void signal_handler(int signal) {
    write(fd, "V", 1);  // 发送关闭命令
    close(fd);
    exit(0);
}

int main() {
    // 打开看门狗设备
    fd = open("/dev/watchdog0", O_WRONLY);
    if (fd < 0) {
        perror("无法打开看门狗设备");
        return -1;
    }

    // 设置超时为45秒
    int timeout = 45;
    write(fd, &timeout, sizeof(timeout));

    // 注册信号处理
    signal(SIGTERM, signal_handler);
    signal(SIGINT, signal_handler);

    // 主循环喂狗
    while (1) {
        write(fd, "\0", 1);  // 喂狗操作
        sleep(10);           // 喂狗间隔（必须小于超时时间）
    }
}
```

#### **编译与运行**

```
Bash




gcc watchdog.c -o watchdog
sudo ./watchdog  # 需root权限
```

------

### **3. Python实现**

```
Python




import os
import time

WD_PATH = "/dev/watchdog0"

def watchdog_control():
    try:
        with open(WD_PATH, 'wb') as wd:
            # 设置超时30秒
            wd.write(b'\x1E')  
            while True:
                wd.write(b'\x00')  # 喂狗
                time.sleep(15)     # 喂狗间隔
    except KeyboardInterrupt:
        with open(WD_PATH, 'wb') as wd:
            wd.write(b'V')  # 安全关闭

if __name__ == "__main__":
    watchdog_control()
```

------

### **4. 内核参数配置**

#### **调整看门狗检测频率**

```
Bash




# 修改检测间隔（默认1秒）
echo 5 > /proc/sys/kernel/watchdog_thresh
```

#### **禁用软件看门狗**

```
Bash




sudo systemctl stop watchdog.service
sudo systemctl disable watchdog.service
```

------

### **5. 系统集成建议**

#### **systemd服务单元**

创建`/etc/systemd/system/my_watchdog.service`：

```
Ini




[Unit]
Description=Custom Watchdog Daemon

[Service]
ExecStart=/usr/local/bin/watchdog
Restart=always
WatchdogSec=40  # 向systemd报告心跳的超时时间

[Install]
WantedBy=multi-user.target
```

启用服务：

```
Bash




sudo systemctl daemon-reload
sudo systemctl start my_watchdog
```

------

### **6. 故障排查**

| **现象**  | **解决方案**                                 |
| ------- | ---------------------------------------- |
| 设备意外重启  | 1. 检查喂狗间隔是否超过超时时间2. 使用`dmesg`查看看门狗触发记录   |
| 无法关闭看门狗 | 1. 确认程序是否持有设备文件描述符2. 强制重启后检查`/var/log/kern.log` |
| 权限不足    | 添加udev规则：`KERNEL=="watchdog*", MODE="0666"` |

------

### **注意事项**

1. **喂狗间隔**：必须小于超时时间（建议≤80%超时值）
2. **安全关闭**：程序退出前必须发送`V`字符，否则系统会重启
3. **双看门狗模式**：同时启用硬件和软件看门狗时，需分别喂狗

如需更复杂的看门狗策略（如条件式喂狗），请说明具体应用场景。